import pin from '../model/pin.model.js'
import User from "../model/user.model.js"
import Like from "../model/like.model.js"
import Save from "../model/save.model.js"
import jwt from "jsonwebtoken"
import sharp from "sharp"
import Imagekit from "imagekit"

export const getPins= async(req,res)=>{
    const pageNumber=Number(req.query.cursor)|| 0;
    const search=req.query.search;
    const userid=req.query.userid;
    const boardid=req.query.boardid
    const LIMIT=21
const pins= await pin.find(search?{
    $or:[
        {title: {$regex:search,$options:"i"}},
        {tags:{$in:[search]}},
    ]
}:userid?{user:userid}:boardid?{board:boardid}:{}).limit(LIMIT).skip(pageNumber*LIMIT);
const hasNextPage=pins.length===LIMIT;
res.status(200).json({pins,nextCursor: hasNextPage ? pageNumber+1 : null});
   
};


export const  getPin= async (req,res)=>{
const {id}=req.params;
const pindoc =await pin.findById(id).populate("user","username img displayname");
res.status(200).json(pindoc);
};
export const createPin=async(req,res)=>{
    const {title,description ,tags,board,link,textOptions,canvasOptions}=req.body;
    const media=req.files.media;
  if(!title||!description||!media||!link){
    return res.status(400).json({message:"All fields are required"});
  }
         const parsedTextOptions = JSON.parse(textOptions || "{}");
  const parsedCanvasOptions = JSON.parse(canvasOptions || "{}");

  const metadata = await sharp(media.data).metadata();

  const originalOrientation =
    metadata.width < metadata.height ? "portrait" : "landscape";
  const originalAspectRatio = metadata.width / metadata.height;

  let clientAspectRatio;
  let width = 0;
  let height = 0;
  if (parsedCanvasOptions.size !== "original") {
    const sizeParts = parsedCanvasOptions.size.split(":");
    const w = Number(sizeParts[0]);
    const h = Number(sizeParts[1]);
    clientAspectRatio = (isFinite(w) && isFinite(h) && h !== 0) ? w / h : 1;
  } else {
    clientAspectRatio =
      parsedCanvasOptions.orientation === originalOrientation
        ? originalAspectRatio
        : 1 / originalAspectRatio;
  }

  width = metadata.width;
  height = metadata.width / clientAspectRatio;
  if (!isFinite(height) || height <= 0) height = metadata.height;

const textLeftPosition = Math.round((Number(parsedTextOptions.left) * width) / 375);
const canvasHeight = isFinite(Number(parsedCanvasOptions.height)) && Number(parsedCanvasOptions.height) > 0 ? Number(parsedCanvasOptions.height) : height;
const textTopPosition = Math.round((Number(parsedTextOptions.top) * height) / canvasHeight);

const safeLeft = isFinite(textLeftPosition) ? Math.max(0, textLeftPosition) : 0;
const safeTop = isFinite(textTopPosition) ? Math.max(0, textTopPosition) : 0;
const safeHeight = isFinite(height) ? height : metadata.height;
const safeFontSize = isFinite(Number(parsedTextOptions.fontSize)) ? Number(parsedTextOptions.fontSize) : 48;

  let croppingStrategy = "";

  if (parsedCanvasOptions.size !== "original") {
    if (originalAspectRatio > clientAspectRatio) {
      let croppingStrategy = "";

      if (parsedCanvasOptions.size !== "original") {
        if (originalAspectRatio > clientAspectRatio) {
          croppingStrategy = ",cm-pad_resize";
        }
      } else {
        if (
          originalOrientation === "landscape" &&
          parsedCanvasOptions.orientation === "portrait"
        ) {
          croppingStrategy = ",cm-pad_resize";
        }
      }

      const imagekit = new Imagekit({
        publicKey: process.env.IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,
        urlEndpoint: process.env.IK_URL_ENDPOINT
      });

      const transformationString = `w-${width},h-${safeHeight}${croppingStrategy},bg-${parsedCanvasOptions.backgroundColor.substring(1)}${
        parsedTextOptions.text
          ? `,l-text,i-${parsedTextOptions.text},fs-${safeFontSize * 2.1},lx-${safeLeft},ly-${safeTop},co-${parsedTextOptions.color.substring(1)},l-end`
          : ""
      }`;

      imagekit
        .upload({
          file: media.data,
          fileName: media.name,
          folder: "test",
          transformation: {
            pre: transformationString,
          },
        })
        .then(async (response) => {
          const newPin = await pin.create({
            user: req.userid,
            title,
            description,
            link: link || null,
            board:  board || null,
            tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
            media: response.filePath,
            width: response.width,
            height: response.height,
          });
          const populatedPin = await pin.findById(newPin._id).populate("user", "username img displayname");
          return res.status(201).json(populatedPin);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    } else {
      const imagekit = new Imagekit({
        publicKey: process.env.IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,
        urlEndpoint: process.env.IK_URL_ENDPOINT
      });

      const transformationString = `w-${width},h-${safeHeight}${croppingStrategy},bg-${parsedCanvasOptions.backgroundColor.substring(1)}${
        parsedTextOptions.text
          ? `,l-text,i-${parsedTextOptions.text},fs-${safeFontSize * 2.1},lx-${safeLeft},ly-${safeTop},co-${parsedTextOptions.color.substring(1)},l-end`
          : ""
      }`;

      imagekit
        .upload({
          file: media.data,
          fileName: media.name,
          folder: "test",
          transformation: {
            pre: transformationString,
          },
        })
        .then(async (response) => {
          const newPin = await pin.create({
            user: req.userid,
            title,
            description,
            link: link || null,
            board:  board || null,
            tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
            media: response.filePath,
            width: response.width,
            height: response.height,
          });
          const populatedPin = await pin.findById(newPin._id).populate("user", "username img displayname");
          return res.status(201).json(populatedPin);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    }
  } else {
    const imagekit = new Imagekit({
      publicKey: process.env.IK_PUBLIC_KEY,
      privateKey: process.env.IK_PRIVATE_KEY,
      urlEndpoint: process.env.IK_URL_ENDPOINT
    });

    const transformationString = `w-${width},h-${safeHeight}${croppingStrategy},bg-${parsedCanvasOptions.backgroundColor.substring(1)}${
      parsedTextOptions.text
        ? `,l-text,i-${parsedTextOptions.text},fs-${safeFontSize * 2.1},lx-${safeLeft},ly-${safeTop},co-${parsedTextOptions.color.substring(1)},l-end`
        : ""
    }`;

    imagekit
      .upload({
        file: media.data,
        fileName: media.name,
        folder: "pin",
        transformation: {
          pre: transformationString,
        },
      })
      .then(async (response) => {
        const newPin = await pin.create({
          user: req.userid,
          title,
          description,
          link: link || null,
          board:  board || null,
          tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
          media: response.filePath,
          width: response.width,
          height: response.height,
        });
        const populatedPin = await pin.findById(newPin._id).populate("user", "username img displayname");
        return res.status(201).json(populatedPin);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  }
};

export const interactionCheck = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;

  const likeCount = await Like.countDocuments({ pin: id });

  if (!token) {
    return res.status(200).json({ likeCount, isLiked: false, isSaved: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res
        .status(200)
        .json({ likeCount, isLiked: false, isSaved: false });
    }

    const userid = payload.userid;

    const isLiked = await Like.findOne({
      user: userid,
      pin: id,
    });
    const isSaved = await Save.findOne({
      user: userid,
      pin: id,
    });

    return res.status(200).json({
      likeCount,
      isLiked: isLiked ? true : false,
      isSaved: isSaved ? true : false,
    });
  });
};


export const interact = async (req, res) => {
  const { id } = req.params;

  const { type } = req.body;

  if (type === "like") {
    const isLiked = await Like.findOne({
      pin: id,
      user: req.userid,
    });

    if (isLiked) {
      await Like.deleteOne({
        pin: id,
        user: req.userid,
      });
    } else {
      await Like.create({
        pin: id,
        user: req.userid,
      });
    }
  } else {
    const isSaved = await Save.findOne({
      pin: id,
      user: req.userid,
    });

    if (isSaved) {
      await Save.deleteOne({
        pin: id,
        user: req.userid,
      });
    } else {
      await Save.create({
        pin: id,
        user: req.userid,
      });
    }
  }

  return res.status(200).json({ message: "Successful" });
};
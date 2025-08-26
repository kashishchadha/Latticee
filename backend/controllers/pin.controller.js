import pin from '../model/pin.model.js'
import User from "../model/user.model.js"
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
        res.status(400).message({message:"All fields are required"});
    }
         const parsedTextOptions = JSON.parse(textOptions || "{}");
  const parsedCanvasOptions = JSON.parse(canvasOptions || "{}");

  const metadata = await sharp(media.data).metadata();

  const originalOrientation =
    metadata.width < metadata.height ? "portrait" : "landscape";
  const originalAspectRatio = metadata.width / metadata.height;

  let clientAspectRatio;
  let width;
  let height;

  if (parsedCanvasOptions.size !== "original") {
    clientAspectRatio =
      parsedCanvasOptions.size.split(":")[0] /
      parsedCanvasOptions.size.split(":")[1];
  } else {
    parsedCanvasOptions.orientation === originalOrientation
      ? (clientAspectRatio = originalOrientation)
      : (clientAspectRatio = 1 / originalAspectRatio);
  }

  width = metadata.width;
  height = metadata.width / clientAspectRatio;

const imagekit=new Imagekit({
    publicKey:process.env.IK_PUBLIC_KEY,
    privateKey:process.env.IK_PRIVATE_KEY,
    urlEndpoint:process.env.IIK_URL_ENDPOINT
})


};
import pin from '../model/pin.model.js'
import User from "../model/user.model.js"
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
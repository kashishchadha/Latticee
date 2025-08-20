import Comment from '../model/comment.model.js'




export const getcomments= async (req,res)=> {
    const {postid}=req.params
    const comments=await Comment.find({pin:postid}).populate("user","username displayname img ").sort({createdAt:-1})
    res.status(200).json(comments)
}

export const addComment=async(req,res)=>{
const { description, pin } = req.body;
const userid = req.userid;
try {
    const comment = await Comment.create({ description, pin, user: userid });
    res.status(201).json(comment);
} catch (error) {
    res.status(500).json({ message: "Failed to add comment", error: error.message });
}
}

export const deletecomment=async(req,res)=>{
    const {id}=req.params;
    const userid = req.userid;
if(!userid){
    return res.status(401).json({message:"not authenticated"});
}
    try{
await Comment.deleteOne({_id:id,user:userid});
res.status(201).json({message:"deleted"});

    }catch(error){
    res.status(500).json({ message: "Failed to delete comment", error: error.message });
    }
}

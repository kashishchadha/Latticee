import Comment from '../model/comment.model.js'




export const getcomments= async (req,res)=> {
    const {postid}=req.params
    const comments=await Comment.find({pin:postid}).populate("user","username displayname img ").sort({createdAt:-1})
    res.status(200).json(comments)
}
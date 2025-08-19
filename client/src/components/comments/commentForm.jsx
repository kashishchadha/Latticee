import EmojiPicker from "emoji-picker-react"
import { useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const addComment=async(comment)=>{
  const res=await apiRequest.post("/comment",comment);
  return res.data
}
const CommentForm=({id})=>{
  const [open,setOpen]=useState    (false);
const [desc,setDesc]=useState("");

const handleEmojiClick=(emoji)=>{
    setDesc((prev)=>prev+ " "+emoji.emoji);
    setOpen(false)
}
 const queryClient=useQueryClient();
const mutation = useMutation({
  mutationFn: addComment,
  onSuccess:()=>{
queryClient.invalidateQueries({ queryKey:["comment",id]})
setDesc("");
setOpen(false);
  }

})

const handlesubmit = async (e) => {
  e.preventDefault();
  const comment ={
  description:desc,
  pin:id,
  }
mutation.mutate(comment)
}
return (

    <form className='commentForm' onSubmit={handlesubmit}>
  <input type='text' placeholder='Add a comment' onChange={(e)=>setDesc(e.target.value)} value={desc}></input>
  <div className="emoji">
    <div onClick={()=>setOpen(prev=>!prev)}>😊</div>
    {open &&
    <div className="emojiPicker"> <EmojiPicker onEmojiClick={handleEmojiClick}/></div>
   }
  </div>
</form>
)

}
export default CommentForm

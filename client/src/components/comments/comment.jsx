import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "../image/image"
import {format} from "timeago.js"
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/authStore";

export const Comment = ({ comment,id }) => {
  const {currentUser}=useAuthStore();
  const deleteComment= async ()=>{
await apiRequest.delete(`/comment/delete/${comment._id}`)
  }
  const queryClient=useQueryClient();
 const mutation = useMutation({
   mutationFn: deleteComment,
   onSuccess:()=>{
 queryClient.invalidateQueries({ queryKey:["comment",id]})
 
   }
 
 })
  const handleclick=()=>{
mutation.mutate()
  }
  return (
    <div className="comment">
<Image
  src={comment.user.img && comment.user.img.startsWith("http") ? comment.user.img : undefined}
  alt=""
/>      <div className="commentContent">
        <span className='commentUsername'>{comment.user.displayname}  
          { (currentUser._id===comment.user._id) &&
           <button className="btn" onClick={handleclick}>Delete</button>
          }
          </span>
        <p className='commentText'>{comment.description}</p>
        <span className='commentTime'>{format(comment.createdAt)}</span>
      </div>
    </div>
  );
}
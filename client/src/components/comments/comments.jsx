import React, { useState } from 'react'
import Image from '../image/image'
import "./comments.css"
import EmojiPicker from "emoji-picker-react"
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';
import { Comment } from './comment';
function Comments({id}) {
  const [open,setOpen]=useState(false);

    const {isPending, error ,data}=useQuery({
    queryKey:["comment",id],
    queryFn: ()=>apiRequest.get(`/comment/${id}`).then((res)=>res.data),
  });
  if(isPending) return "Loading...";
  if(error) return "errro occured :"+ error.message;
  if(!data) return "username not found"

  return (
    

    <div className="comments">

      <div className="commentList">
        <span className='commentCount'>{data.length===0?"No comments":data.length+"comments"}</span>
       
{data.map((comment)=>(
  <Comment key={comment._id} comment={comment}/>
))}

      </div>
<form className='commentForm'>
  <input type='text' placeholder='Add a comment'></input>
  <div className="emoji">
    <div onClick={()=>setOpen(prev=>!prev)}>😊</div>
    {open &&
    <div className="emojiPicker"> <EmojiPicker/></div>
   }
  </div>
</form>

    </div>
    





    
  )
}

export default Comments
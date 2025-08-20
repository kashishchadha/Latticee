import "./comments.css"
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';
import { Comment } from './comment';
import CommentForm from "./commentForm";
function Comments({id}) {

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
  <Comment key={comment._id} comment={comment} id={id}/>
))}

      </div>
<CommentForm id={id} />

    </div>
    





    
  )
}

export default Comments
import Image from "../image/image"
import {format} from "timeago.js"
export const Comment = ({ comment }) => {
  return (
    <div className="comment">
<Image
  path={!comment.user.img ? "/general/noAvatar.png" : undefined}
  src={comment.user.img && comment.user.img.startsWith("http") ? comment.user.img : undefined}
  alt=""
/>      <div className="commentContent">
        <span className='commentUsername'>{comment.user.displayname}</span>
        <p className='commentText'>{comment.description}</p>
        <span className='commentTime'>{format(comment.createdAt)}</span>
      </div>
    </div>
  );
}
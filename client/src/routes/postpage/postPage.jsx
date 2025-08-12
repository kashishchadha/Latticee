import React from 'react'
import './postPage.css'
import Image from '../../components/image/image'
import {Link} from 'react-router'
import PostInteraction from '../../components/postInteraction/postInteraction'
import Comments from '../../components/comments/comments'
function PostPage() {
  return (
    <div className='postPage'>
        <svg
        height="20"
        viewBox="0 0 24 24"
        width="20"
        style={{ cursor: "pointer" }}
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>
<div className="postContainer">
  <div className="postImage">
    <Image path="/pin/pin1.jpeg" alt="" w={736}/>
  </div>
  <div className="postDetails">
    <PostInteraction/>
    <Link to="/john" className='postUser'>
    <Image path="/general/noAvatar.png"/>
    <span>John Doe</span>
    
    </Link>
    <Comments/>
  </div>
</div>

    </div>
  )
}

export default PostPage
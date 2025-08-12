import React from 'react'
import './postInteraction.css'
import Image from '../image/image'
function PostInteraction() {
  return (
   <div className="postInteraction">
    <div className="interactionIcons">
      <Image path="/general/react.svg" alt=""/>
      273
<Image path="/general/share.svg" alt=""/>
<Image path="/general/more.svg" alt=""/>

    </div>
    <button>Save</button>
   </div>
  )
}

export default PostInteraction
import React from 'react'
import "./galleryItem.css"
import Image from '../image/image'
import { Link } from 'react-router'

function GalleryItem({item}) {
  const optimizedheight=(372*item.height)/item.width
  return (
    <div className='galleryItem' style={{gridRowEnd:`span ${Math.ceil(item.height/100)}`}}>
        <Image path={item.media}  alt='' h={optimizedheight} w={372}/>
        <Link to={`/pin/${item.id}`} className='overlay'></Link>
        <button className='saveButton'>Save</button>

        <div className="overlayIcons">
<button>
  <Image path="/general/share.svg" alt="Share"></Image>
</button>

<button>
  <Image path="/general/more.svg" alt="More options"></Image>
</button>

        </div>
    </div>
  )
}

export default GalleryItem
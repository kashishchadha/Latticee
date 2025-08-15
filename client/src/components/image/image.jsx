import React from 'react'
import {IKImage} from 'imagekitio-react'

function Image({path,src,classname,alt,w,h}) {
  return (
   <IKImage 
          urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT} 
          path={path}
          src={src}
          transformation={[{
            width: w,
            height:h
          }]} 
          alt={alt}
          loading="lazy"
          className={classname}
          lqip={{active: true, quality: 20}}
        />
  )
}

export default Image
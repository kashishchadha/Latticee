import React from 'react'
import {IKImage} from 'imagekitio-react'

function Image({src, path, classname, alt, w, h}) {
  const imageSource = src || path;
  
  const isExternalUrl = imageSource && (
    imageSource.startsWith('http') || 
    imageSource.startsWith('https%3A') ||
    imageSource.includes('picsum.photos') ||
    imageSource.includes('unsplash.com')
  );
  
  const isLocalAsset = imageSource && imageSource.startsWith('/');
  
  let imageProps = {};
  
  if (isExternalUrl) {
    const decodedUrl = imageSource.startsWith('https%3A') 
      ? decodeURIComponent(imageSource) 
      : imageSource;
    imageProps = { src: decodedUrl };
  } else if (isLocalAsset) {
    imageProps = { path: imageSource };
  } else {
    imageProps = { path: imageSource };
  }

  return (
   <IKImage 
          urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT} 
          {...imageProps}
          transformation={w || h ? [{
            width: w,
            height: h
          }] : []} 
          alt={alt}
          loading="lazy"
          className={classname}
          lqip={{active: true, quality: 20}}
        />
  )
}

export default Image
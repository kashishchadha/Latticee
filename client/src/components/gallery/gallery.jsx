import React from 'react'
import './gallery.css'
import GalleryItem from '../galleryItem/galleryItem';
function Gallery() {

  const items = [
  {
    id: 1,
    media: "/pin/pin1.jpeg",
    width: 1260,
    height: 1000,
  },
  {
    id: 2,
    media: "/pin/pin2.jpeg",
    width: 1260,
    height: 1400,
  },
  {
    id: 3,
    media: "/pin/pin3.jpeg",
    width: 1260,
    height: 1400,
  },
  {
    id: 4,
    media: "/pin/pin4.jpeg",
    width: 1260,
    height: 1000,
  },
  {
    id: 5,
    media: "/pin/pin5.jpeg",
    width: 1260,
    height: 1243,
  },
  {
    id: 6,
    media: "/pin/pin6.jpeg",
    width: 1260,
    height: 1568,
  },
  {
    id: 7,
    media: "/pin/pin7.jpeg",
    width: 1260,
    height: 1234,
  },
  {
    id: 8,
    media: "/pin/pin8.jpeg",
    width: 1260,
    height: 1400,
  },
  {
    id: 9,
    media: "/pin/pin9.jpeg",
    width: 1260,
    height: 1000,
  },
  {
    id: 10,
    media: "/pin/pin10.jpeg",
    width: 1260,
    height: 1000,
  },
  {
    id: 11,
    media: "/pin/pin11.jpeg",
    width: 1260,
    height: 1000,
  },
  {
    id: 12,
    media: "/pin/pin12.jpeg",
    width: 1260,
    height: 1400,
  },
  {
    id: 13,
    media: "/pin/pin13.jpeg",
    width: 1260,
    height: 1400,
  },
  {
    id: 14,
    media: "/pin/pin14.jpeg",
    width: 1260,
    height: 1600,
  },
  {
    id: 15,
    media: "/pin/pin15.jpeg",
    width: 1260,
    height: 1000,
  },
  {
    id: 16,
    media: "/pin/pin16.jpeg",
    width: 1260,
    height: 1260,
  },
  {
    id: 17,
    media: "/pin/pin17.jpeg",
    width: 1260,
    height: 1000,
  },
  {
    id: 18,
    media: "/pin/pin18.jpeg",
    width: 1260,
    height: 1260,
  },
  {
    id: 19,
    media: "/pin/pin19.jpeg",
    width: 1260,
    height: 1400,
  },
  {
    id: 20,
    media: "/pin/pin20.jpeg",
    width: 1260,
    height: 1260,
  },
  {
    id: 21,
    media: "/pin/pin21.jpeg",
    width: 1260,
    height: 1400,
  },
  {
    id: 22,
    media: "/pin/pin22.jpeg",
    width: 1260,
    height: 1890,
  },
  {
    id: 23,
    media: "/pin/pin23.jpeg",
    width: 1260,
    height: 1260,
  },
  {
    id: 24,
    media: "/pin/pin24.jpeg",
    width: 1260,
    height: 1260,
  },
  {
    id: 25,
    media: "/pin/pin25.jpeg",
    width: 1260,
    height: 1260,
  },
];
  return (
    <div className='gallery'>
{items.map(item=>(
  <GalleryItem key={item.id} item={item}/>
))}

    </div>
  )
}

export default Gallery

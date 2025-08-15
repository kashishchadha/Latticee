import React from 'react'
import './gallery.css'
import InfiniteScroll from "react-infinite-scroll-component"
import { useInfiniteQuery } from '@tanstack/react-query';
import GalleryItem from '../galleryItem/galleryItem';
import apiRequest from '../../utils/apiRequest';

 

const fetchpins=async({pageParam,search,userid,boardid})=>{
const res=await apiRequest.get(`/pin?cursor=${pageParam}&search=${search || ""}&userid=${userid || ""}&boardid=${boardid || ""}`);
return res.data
}
function Gallery({search,userid,boardid}) {

const {data,fetchNextPage,hasNextPage,status} = useInfiniteQuery({ queryKey: ['pins'],
   queryFn:({pageParam=0})=> fetchpins({pageParam,search,userid,boardid}),
  initialPageParam:0,
  getNextPageParam:(lastPage)=>lastPage.nextCursor,
  });
 
if(status=="pending") return "Loading....";
  if(status=="error" )return "Somthing went wrong...";
  const allPins=data?.pages.flatMap((page)=>page.pins)||[];

  return (
    <InfiniteScroll dataLength={allPins.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={<h4>Loading more pins</h4>} endMessage={<h3>All post Loaded!</h3>}>
    <div className='gallery'>
{allPins.map(item=>(
  <GalleryItem key={item._id} item={item}/>
 
))}

    </div>
     </InfiniteScroll >
  );
};

export default Gallery

import React from 'react'
import './boards.css'
import Image from '../image/image'
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';
import { Link } from 'react-router-dom';
import {format} from "timeago.js"
function Boards({userid}) {

  const {isPending, error ,data}=useQuery({
    queryKey:["board",userid],
    queryFn: ()=>apiRequest.get(`/board/${userid}`).then((res)=>res.data),
  });
  if(isPending) return "Loading...";
  if(error) return "errro occured :"+ error.message;
  if(!data) return "username not found"
console.log("dta",data)
    
  return (
    <div className="collections">

  {data?.map((board)=>(
       <Link to={`/search?boardid=${board._id}`} className="collection" key={board.id}>
<Image src={board.firstPin.media} alt=""/>
<div className="collectionInfo">
    <h1>{board.title}</h1>
    <span>{board.pincount} Pins .{format (board.createdAt)}</span>
</div>
</Link>
  ))}

    </div>
  )
}

export default Boards
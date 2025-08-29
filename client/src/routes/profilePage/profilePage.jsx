import React, { useState } from 'react'
import Image from '../../components/image/image'
import './profilePage.css'
import Gallery from '../../components/gallery/gallery'
import apiRequest from '../../utils/apiRequest'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import Boards from '../../components/boards/boards'
import FollowButton  from './followButton.jsx'
function ProfilePage() {
  const [type,setType]=useState("saved")
const {username}=useParams()
    const {isPending, error ,data}=useQuery({
    queryKey:["profile",username],
    queryFn: ()=>apiRequest.get(`/user/${username}`).then((res)=>res.data),
  });
  if(isPending) return "Loading...";
  if(error) return "errro occured :"+ error.message;
  if(!data) return "username not found"
console.log(data);

  return (

   <div className="profilePage" >
<Image path={data.img ||"/general/noAvatar.png"} alt="" />
<h1 className='profileName'>{data.displayname}</h1>
<span className='profileusename'>{data.username}</span>
<div className="followCounts"></div>{data.followerCount} Followers  . {data.followingCount} Followings
   

   <div className="profileInteractions">
    <Image path="/general/share.svg" alt=""/>
    <div className="profileButtons">
      <button>Messages</button>
<FollowButton isFollowing={data.isFollowing} username={data.username}/>
    </div>
    <Image path="/general/more.svg" alt=""/>
       </div>

       <div className="profileOptions">
        <span onClick={()=>setType("created")} className={type=="created"?"active":""}>Created</span>
        <span onClick={()=>setType("saved")} className={type=="saved"?"active":""}>Saved</span>
       </div>
       {
        type=="created"?<Gallery userid={data._id}/>:< Boards userid={data._id} />
       }
   </div>
  )
}

export default ProfilePage
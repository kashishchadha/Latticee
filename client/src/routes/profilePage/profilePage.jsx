import React, { useState } from 'react'
import Image from '../../components/image/image'
import './ProfilePage.css'
import Collections from '../../components/collections/collections'
import Gallery from '../../components/gallery/gallery'
function ProfilePage() {
  const [type,setType]=useState("saved")
  return (

   <div className="profilePage" >
<Image path="/general/noAvatar.png" alt="" />
<h1 className='profileName'>John Doe</h1>
<span className='profileusename'>@johndoe</span>
<div className="followCounts"></div>10 followers . 20 followings
   

   <div className="profileInteractions">
    <Image path="/general/share.svg" alt=""/>
    <div className="profileButtons">
      <button>Messages</button>
            <button>Follow</button>

    </div>
    <Image path="/general/more.svg" alt=""/>
       </div>

       <div className="profileOptions">
        <span onClick={()=>setType("created")} className={type=="created"?"active":""}>Created</span>
        <span onClick={()=>setType("saved")} className={type=="saved"?"active":""}>Saved</span>
       </div>
       {
        type=="created"?<Gallery/>:<Collections/>
       }
   </div>
  )
}

export default ProfilePage
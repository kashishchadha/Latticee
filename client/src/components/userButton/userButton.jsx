import React, { useState } from 'react'
import Image from '../image/image';
import './userButton.css'
function UserButton() {
const [open,setOpen]=useState(false);
  const currentuser=true;
  return currentuser?(
    <div className='userButton'>
      <Image path="/general/noAvatar.png" alt=""></Image>
       <img onClick={()=>setOpen((prev)=>!prev)} src="/general/arrow.svg" alt="" className='arrow'></img>
     {open && (
       <div className="useroptions">
        <div className="useroption">Profile</div>
                <div className="useroption">Setting</div>
                        <div className="useroption">Logout</div>


       </div>
      ) }
    </div>
  ):(
    <a href="/" className='loginlink'>Login/Signup</a>
  )
}

export default UserButton
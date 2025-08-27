import React, { useState } from 'react'
import Image from '../image/image';
import useAuthStore from '../../utils/authStore';
import './userButton.css'
import apiRequest from '../../utils/apiRequest';
import { Link, useNavigate } from 'react-router';
function UserButton() {
const [open,setOpen]=useState(false);
  const navigate=useNavigate()
  const {currentUser,removeCurrentUser}=useAuthStore();
  const handleLogout= async()=>{
    try{
    await apiRequest.post("/user/auth/logout",{});
    removeCurrentUser();
    navigate("/auth");
    }catch(error){
      console.log(error);
    }

  }
  return currentUser?(
    <div className='userButton'>
      
      <Image path={currentUser.img || "/general/noAvatar.png"} alt=""></Image>
      <div   onClick={()=>setOpen((prev)=>!prev)} >
       <Image path="/general/arrow.svg" alt="" className='arrow'></Image>
     </div>
     {open && (
       <div className="useroptions">
        <Link  to={`/${currentUser.username}`} className="useroption">Profile</Link>
                <div className="useroption">Setting</div>
                        <div onClick={handleLogout} className="useroption">Logout</div>


       </div>
      ) }
    </div>
  ):(
    <Link to="/auth" className='loginlink'>Login/Signup</Link>
  )
}

export default UserButton
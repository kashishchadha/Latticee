import React, { useState } from 'react'
import Image from '../../components/image/image'
import './authPage.css'
import apiRequest from '../../utils/apiRequest';
import useAuthStore from '../../utils/authStore';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const Navigate=useNavigate();

  const {setCurrentUser}=useAuthStore();

  
   const [ isRegister,setIsRegister]=useState(false);
    const [error,setError]=useState("");

    const handleSubmit= async(e)=>{
      e.preventDefault();
      const formData=new FormData(e.target)
      const data = Object.fromEntries(formData)
      
      try{
const res = await apiRequest.post(`/user/auth/${isRegister?"register":"login"}`, data)
setCurrentUser(res.data)
       Navigate("/");
      }
   
      catch(error){
  setError(error.response?.data?.message || "Login failed")
}
      
    }

  return (
   

    <div className="authPage">
      <div className="authContainer">
        <Image src="/general/logo.png" alt=""/>
        <h1>{isRegister?"Create an Account ":"Login to Your Account"}</h1>
{isRegister?(

        <form key="registerForm" onSubmit={handleSubmit}>
 <div className="formGroup">
            <label htmlFor='Username'>Username</label>
            <input type='username' placeholder='Username' required name="username" id='username'></input>
          </div>

 <div className="formGroup">
            <label htmlFor='displayName'>Name</label>
            <input type='displayname' placeholder='displayName' required name="displayname" id='displayName'></input>
          </div>


          <div className="formGroup">
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='Email' required name="email" id='email'></input>
          </div>

          <div className="formGroup">
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='password' required name="password" id='password'></input>
          </div>
          <button type="submit">Register</button>
          <p onClick={()=>setIsRegister(false)}> Do you have an account?<b>Login</b></p>
          {error && <p className='error'>{error}</p>}
        </form>


):(

          <form key="loginForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='Email' required name="email"></input>
          </div>

          <div className="formGroup">
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='password' required name="password"></input>
          </div>
          <button type="submit">Login</button>
          <p onClick={()=>setIsRegister(true)}>DON&apos;t have an account?<b>Register</b></p>
          {error && <p className='error'>{error}</p>}
        </form>
)}
      </div>
    </div>
  )
}

export default AuthPage
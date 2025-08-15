import React, { useState } from 'react'
import Image from '../../components/image/image'
import './authPage.css'
import apiRequest from '../../utils/apiRequest';

function AuthPage() {
   const [ isRegister,setIsRegister]=useState(false);
    const [error,setError]=useState("");

    const handleSubmit= async(e)=>{
      e.preventDefault();
      const formData=new FormData(e.target)
      const data = Object.fromEntries(formData)
      
      try{
await apiRequest.post("/user/auth/register", data)

      }catch(error){
        setError(error.data)
      }
    }
  return (
   

    <div className="authPage">
      <div className="authContainer">
        <Image path="/general/logo.png" alt=""/>
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

          <form key="loginForm">
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
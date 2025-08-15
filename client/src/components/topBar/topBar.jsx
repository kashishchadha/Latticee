import React from 'react'
import './topBar.css'
import Image from '../image/image.jsx'
import UserButton from '../userButton/userButton.jsx'
import { useNavigate } from 'react-router'
function TopBar() {
  
  const Navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault();
Navigate(`/search?search=${e.target[0].value}`)

  }
  return (
<div className="topBar">
<form onSubmit={handleSubmit} className="search">

    <Image path='/general/search.svg' alt='' />
    <input type="text" placeholder='Search' />
</form>
<UserButton/>
</div>
  )
}

export default TopBar
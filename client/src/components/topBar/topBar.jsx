import React from 'react'
import './topBar.css'
import Image from '../image/image.jsx'
import UserButton from '../userButton/userButton.jsx'
function topBar() {
  return (
<div className="topBar">
<div className="search">

    <Image path='/general/search.svg' alt='' />
    <input type="text" placeholder='Search' />
</div>
<UserButton/>
</div>
  )
}

export default topBar
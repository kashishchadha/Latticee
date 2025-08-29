import React from 'react'
import './leftBar.css'
import Image from '../image/image'
import { Link } from 'react-router'
function LeftBar() {
  return (
    <div className="leftBar">
        <div className="menueIcons">
            <Link to="/" className='menueIcon'>
            <Image src='/general/logo.png'className='logo' alt='' />
            </Link>
               <Link to="/" className='menueIcon'>
            <Image src='/general/home.svg' alt='' />
           </Link>

                <Link to="/create" className='menueIcon'>
            <Image src='/general/create.svg' alt='' />
            </Link>
             
               <Link to="" className='menueIcon'>
            <Image src='/general/updates.svg' alt='' />
            </Link>
               <Link to="" className='menueIcon'>
            <Image src='/general/messages.svg' alt='' />
            </Link>
         
        </div>
           <Link to="" className='menueIcon'>
            <Image src='/general/settings.svg' alt='' />
            </Link>
    </div>
  )
}

export default LeftBar
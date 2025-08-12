import React from 'react'
import {Outlet} from 'react-router'
import './mainLayout.css'
import LeftBar from '../../components/leftBar/leftBar'
import TopBar from '../../components/topBar/topBar.jsx'

function MainLayout() {
  return (
       <div className='app'>
      <LeftBar/>

      <div className="content">
        <TopBar/>
   <Outlet/>

      </div>
      </div>
  )
}

export default MainLayout
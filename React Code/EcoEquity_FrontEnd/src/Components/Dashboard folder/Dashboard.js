import React, { useState } from 'react';
import './Dashboard.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { useLocation } from 'react-router-dom';
function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const location = useLocation();
  const isHeaderFixed = location.pathname === '/Watchlist' || location.pathname === '/Forum';
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container' style={{ paddingTop: "75px" }}>
     {/* {isHeaderFixed ? null : <Header OpenSidebar={OpenSidebar} />} */}
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

export default Dashboard
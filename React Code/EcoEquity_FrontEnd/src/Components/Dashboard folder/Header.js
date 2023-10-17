import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsJustify, BsPersonCircle } from 'react-icons/bs';
import LogoutButton from './LogoutButton';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navbar.css";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link

function Header({ OpenSidebar }) {
  const location = useLocation();

  const buttonStyle = {
    backgroundColor: 'white', // Set the background color to white
    color: 'black', // Text color
    padding: '10px 20px', // Adjust padding as needed
    borderRadius: '5px', // Rounded corners
    textDecoration: 'none', // Remove underline
    marginRight: '10px', // Add a right margin for spacing
  };

  // Function to render the "Dashboard" button conditionally
  const renderDashboardButton = () => {
    if (
      location.pathname === '/Watchlist' ||
      location.pathname === '/forum' ||
      location.pathname === '/education' ||
      location.pathname === '/esg'     ||
      location.pathname === '/Transactions'
    ) {
      return (
        <Link to="/Dashboard" style={buttonStyle}>
          Dashboard
        </Link>
      );
    }
    return null; // Render nothing if not on the specified routes
  };

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <Link to="/" style={buttonStyle}>
              Home
            </Link>
            {renderDashboardButton()}
        </div>
        <div className='header-right'>
            {/* Display the LogoutButton component */}
            <LogoutButton />
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header;

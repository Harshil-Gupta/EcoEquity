import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <Button variant="light" onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;

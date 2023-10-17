import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const PrivateRoutes = () => {
  // Check if the user is authenticated (e.g., by checking if there's a user token in localStorage)
  const isAuthenticated = localStorage.getItem('user') !== null;

  if (!isAuthenticated) {
    return (
      <div style={{ paddingTop: "75px" }}>
      <Alert variant="danger">
        You need to login to access this page. Please <Alert.Link href="/login">log in</Alert.Link>.
      </Alert>
      </div>
    );
  }

  return <Outlet />;
};

export default PrivateRoutes;

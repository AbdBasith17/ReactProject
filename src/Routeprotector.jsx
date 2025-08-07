 
import React from 'react';
import { Navigate } from 'react-router-dom';

function Routeprotect  ({ children })  {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
export default Routeprotect

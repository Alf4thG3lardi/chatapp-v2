import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const ProtectedRoute = ({ Component }) => {
  const user = Cookies.get('user'); // Check for your cookie

  return (
    user ? <Component/> : <Navigate to="/login"/>
  );
};

export default ProtectedRoute;

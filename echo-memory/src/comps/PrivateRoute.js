// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase/config';

function PrivateRoute() {
  const user = auth.currentUser; // Check if the user is authenticated

  return user ? <Outlet /> : <Navigate to="/login" />; // If user is authenticated, render the child routes, else redirect to login
}

export default PrivateRoute;

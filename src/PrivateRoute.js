import React from 'react'

import { useAuth } from './contexts/AuthContext.js'

import { Navigate, Outlet } from 'react-router-dom';


export default function PrivateRoute() {

    const { currentUser } = useAuth()


  return currentUser ? <Outlet /> : <Navigate to="/login" />;

}

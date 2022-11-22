import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute(props) {
    return props.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useLocation, Navigate } from 'react-router-dom';


const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
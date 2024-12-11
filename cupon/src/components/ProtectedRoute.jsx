
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// const ProtectedRoute = ({ children, roleRequired }) => {
//   const { isAuthenticated, user } = useAuth();
//   console.log(user);

//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check for required role
//   if (roleRequired && user?.role !== roleRequired) {
//     return <Navigate to={roleRequired === 'admin' ? '/admin-dashboard' : '/dashboard'} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { isAuthenticated, user } = useAuth();
//   console.log("isAuthenticated:", isAuthenticated);
//   console.log("User:", user);

  // Show a loading indicator while checking authentication
  if (isAuthenticated === null) return <div>Loading...</div>;

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check for required role and redirect accordingly
  if (roleRequired && user?.role !== roleRequired) {
    return <Navigate to={roleRequired === 'admin' ? '/admin-dashboard' : '/dashboard'} replace />;
  }

  // Render children if authenticated and authorized
  return children;
};

export default ProtectedRoute;
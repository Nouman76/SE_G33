import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token"); // Check for seller token
  const isSeller = localStorage.getItem("seller"); // Check for seller data

  if (!isAuthenticated || !isSeller) {
    // Redirect to /admin with the current location to return after login
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
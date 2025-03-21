import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {}, [userInfo]);

  // ✅ Check if user is authenticated
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  // ✅ Check if user role matches allowedRole
  if (userInfo.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

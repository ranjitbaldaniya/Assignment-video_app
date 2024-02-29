// PrivateRoute.js
import React, { useContext } from "react";
import {  Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContect";

const PrivateRoute = ({  children  }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

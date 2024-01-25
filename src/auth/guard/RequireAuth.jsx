/* eslint-disable */
// ----------------------------------------------------------------------

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthInfo } from "../../utils/AuthUtil";

export default function RequireAuth({ children }) {
  const authenticationInfo = getAuthInfo();
  console.log(authenticationInfo);

  const location = useLocation();

  // If the user is logged in, render the child components.
  // Otherwise, redirect to the login screen.
  return authenticationInfo?.id ? (
    <Outlet>{children}</Outlet>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
}

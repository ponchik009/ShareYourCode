import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Unauthorized from "../../pages/unauthorized/Unauthorized";

interface IRouteProps {
  isAuth: boolean | null;
  redirectPath: string;
}

const ProtectedRoute: React.FC<IRouteProps> = ({
  isAuth,
  children,
  redirectPath,
}) => {
  if (!isAuth) {
    // return <Navigate to={redirectPath} replace />;
    return <Unauthorized />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;

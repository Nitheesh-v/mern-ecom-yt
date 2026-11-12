import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const CheckAuth = ({ children }) => {
  const location = useLocation();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
 




  const isAuthRoute = location.pathname.startsWith("/auth");


  const isAdminRoute = location.pathname.startsWith("/admin");
  const isShopRoute = location.pathname.startsWith("/shop");

  
console.log("debug",{
  path: location.pathname,
  isAuthenticated,
  role: user?.role,
  isAdminRoute,
  isShopRoute,
  isAuthRoute
});


  if (!isAuthenticated && !isAuthRoute) {
    return <Navigate to="/auth/login" replace />;
  }


  if (isAuthenticated && isAuthRoute) {
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/shop/home" replace />;
  }

 
  if (isAuthenticated && user?.role === "user" && isAdminRoute) {
    return <Navigate to="/unauth" replace />;
  }

  
  if (isAuthenticated && user?.role === "admin" && isShopRoute) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

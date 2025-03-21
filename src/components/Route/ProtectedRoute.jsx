// import React from "react";
// import { Navigate, Route } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h2 className="text-xl font-semibold">Loading...</h2>
//       </div>
//     );
//   }

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (!isAuthenticated) {
//           return <Navigate to="/login" />;
//         }

//         if (isAdmin && user.role !== "admin") {
//           return <Navigate to="/login" />;
//         }

//         return <Component {...props} />;
//       }}
//     />
//   );
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role, allowedRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role !== allowedRole) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminDashboard from "./components/Admin/AdminDashboard";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Login from "./auth/Login";

const App = () => {
  const { userInfo } = useSelector((state) => state.auth) || { userInfo: null };

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/login" />} />
    //     {/* ✅ Public Route */}
    //     <Route path="/login" element={<Login />} />

    //     {/* ✅ Admin Routes */}
    //     <Route
    //       path="/admin/dashboard/*"
    //       element={
    //         <ProtectedRoute role="admin">
    //           <AdminDashboard />
    //         </ProtectedRoute>
    //       }
    //     />

    //     {/* ✅ Teacher Routes */}
    //     <Route
    //       path="/teacher/dashboard/*"
    //       element={
    //         <ProtectedRoute role="teacher">
    //           <TeacherDashboard />
    //         </ProtectedRoute>
    //       }
    //     />
    //   </Routes>
    // </Router>

    <Router>
      <Routes>
        {/* ✅ Login Page */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Admin Protected Route */}
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Teacher Protected Route */}
        <Route
          path="/teacher/dashboard/*"
          element={
            <ProtectedRoute allowedRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Default Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

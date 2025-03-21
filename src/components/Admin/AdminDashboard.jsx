import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";
import AddStudent from "./AddStudent";
import AddCourse from "./AddCourse";
import ListCourse from "./ListCourse";
import Register from "./Register";
import AttendanceReport from "./AttendanceReport";
import ListStudent from "./ListStudent";
import AddDuration from "./addDuration";
import ListDuration from "./ListDuration";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {}, [userInfo]);

  if (!userInfo || userInfo.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      {/* Main Content */}
      <div className="flex-1 p-4 pt-16 md:pt-4">
        <Routes>
          <Route path="/" element={<AddStudent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendanceReport" element={<AttendanceReport />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/list-course" element={<ListCourse />} />
          <Route path="/add-duration" element={<AddDuration />} />
          <Route path="/list-duration" element={<ListDuration />} />
          <Route path="/list-students" element={<ListStudent />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";

// Add props to accept state from parent
const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch(); // ✅ Move useDispatch here
  const navigate = useNavigate(); // ✅ Move useNavigate here

  const handleLogout = () => {
    // ✅ Clear User Data from Redux & LocalStorage
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    // ✅ Redirect to Login Page
    navigate("/login", { replace: true });
  };
  // Use the passed setter function
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile hamburger menu */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-30 bg-gray-800 text-white p-2 rounded"
        aria-label="Toggle menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar - use props to control visibility */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static z-20 w-64 min-h-screen bg-gray-800 text-white transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-bold text-center p-4 border-b border-gray-700">
          Admin Panel
        </h2>

        <nav className="mt-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ✅ Add Student
          </Link>
          <Link
            to="/admin/dashboard/register"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ✅ Register Teacher
          </Link>
          <Link
            to="/admin/dashboard/attendanceReport"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ✅ Attendance Report
          </Link>
          <Link
            to="/admin/dashboard/add-course"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            📋 Add Course
          </Link>
          <Link
            to="/admin/dashboard/list-course"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            📋 All Course
          </Link>
          <Link
            to="/admin/dashboard/add-duration"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            📋 Add Duration
          </Link>
          <Link
            to="/admin/dashboard/list-duration"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            📋 All Duration
          </Link>

          <Link
            to="/admin/dashboard/list-students"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            📊 List Students
          </Link>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded w-full"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay - improve z-index ordering */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;

import React, { useState } from "react";
import { useAddCourseMutation } from "../../redux/api/courseApiSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [addCourse, { isLoading, isSuccess, error }] = useAddCourseMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName.trim()) {
      toast.error("Course name is required");
      return;
    }

    try {
      await addCourse({ name: courseName }).unwrap();
      toast.success("Course added successfully!");
      setTimeout(() => navigate("/admin/dashboard/list-course"), 1500); // Redirect after success
    } catch (error) {
      toast.error("Error adding course");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Add New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course name"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

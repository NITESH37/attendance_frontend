import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGetCourseQuery } from "../../redux/api/courseApiSlice";
import { useAddStudentMutation } from "../../redux/api/studentsApiSlice";
import { useGetSemesterQuery } from "../../redux/api/semesterApiSlice";
import { useGetsSectionQuery } from "../../redux/api/sectionApiSlice";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    courseId: "",
    semesterId: "",
    sectionId: "",
  });

  const [showModal, setShowModal] = useState(false);

  const { data: courses } = useGetCourseQuery();
  const { data: semesters } = useGetSemesterQuery();
  const { data: sections } = useGetsSectionQuery();

  const [addStudent, { isLoading }] = useAddStudentMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.rollNumber.trim())
      return toast.error("Roll Number is required");
    if (!formData.courseId) return toast.error("Course is required");
    if (!formData.semesterId) return toast.error("Semester is required");
    if (!formData.sectionId) return toast.error("Section is required");

    // Send data using correct field names for the backend
    const formattedData = {
      name: formData.name,
      rollNumber: formData.rollNumber,
      course: formData.courseId, // ✅ Match backend schema
      semester: formData.semesterId, // ✅ Match backend schema
      section: formData.sectionId,
    };

    try {
      const response = await addStudent(formattedData);
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Student added successfully!");
        setShowModal(true);
        setFormData({
          name: "",
          rollNumber: "",
          courseId: "",
          semesterId: "",
          sectionId: "",
        });
      }
    } catch (error) {
      toast.error("Failed to add student");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/admin/dashboard/list-students");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter Student Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter Roll Number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Course</label>
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Select Course</option>
            {courses?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Semester</label>
          <select
            name="semesterId"
            value={formData.semesterId}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Select Semester</option>
            {semesters?.map((semester) => (
              <option key={semester._id} value={semester._id}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Section</label>
          <select
            name="sectionId"
            value={formData.sectionId}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Select Section</option>
            {sections?.map((section) => (
              <option key={section._id} value={section._id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded ${
            isLoading ? "bg-gray-400" : "bg-blue-500"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Adding Student..." : "Add Student"}
        </button>
      </form>

      <ToastContainer />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">
              ✅ Student Added Successfully!
            </h2>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Student List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;

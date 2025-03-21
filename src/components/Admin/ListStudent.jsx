import React, { useState } from "react";
import {
  useGetFilterStudentQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from "../../redux/api/studentsApiSlice";
import { useGetCourseQuery } from "../../redux/api/courseApiSlice";
import { useGetSemesterQuery } from "../../redux/api/semesterApiSlice";
import { useGetsSectionQuery } from "../../redux/api/sectionApiSlice";

const ListStudent = () => {
  const [courseId, setCourseId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [filterClicked, setFilterClicked] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);

  const { data: courses } = useGetCourseQuery();
  const { data: semesters } = useGetSemesterQuery();
  const { data: sections } = useGetsSectionQuery(courseId, { skip: !courseId });
  const { data: students, isLoading } = useGetFilterStudentQuery(
    { courseId, semesterId, sectionId },
    { skip: !filterClicked }
  );

  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const [deleteStudentApi, { isLoading: isDeleting }] =
    useDeleteStudentMutation();

  const handleFilter = () => {
    if (courseId && semesterId && sectionId) {
      setFilterClicked(true);
    } else {
      console.error("Please select all fields before filtering.");
    }
  };

  const handleUpdateStudent = async () => {
    const updateData = {
      id: editStudent._id,
      rollNumber: editStudent.rollNumber,
      name: editStudent.name,
      course: editStudent.courseId, // Rename to "course"
      semester: editStudent.semesterId, // Rename to "semester"
      section: editStudent.sectionId, // Rename to "section"
    };

    console.log("🚀 Sending update request with renamed fields:", updateData);

    try {
      await updateStudent(updateData).unwrap();
      console.log("✅ Update successful!");
      setEditStudent(null);
    } catch (error) {
      console.error("❌ Error updating student:", error);
    }
  };

  const handleDeleteStudent = async () => {
    if (deleteStudent?._id) {
      try {
        await deleteStudentApi({ id: deleteStudent._id }).unwrap();
        setDeleteStudent(null);
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    } else {
      console.error("Error: Student ID is missing for delete");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        List Students by Filter
      </h2>

      {/* Filter Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Course</option>
          {courses?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>

        <select
          value={semesterId}
          onChange={(e) => setSemesterId(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Semester</option>
          {semesters?.map((semester) => (
            <option key={semester._id} value={semester._id}>
              {semester.name}
            </option>
          ))}
        </select>

        <select
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          className="p-2 border rounded w-full"
          disabled={!courseId}
        >
          <option value="">Select Section</option>
          {sections?.map((section) => (
            <option key={section._id} value={section._id}>
              {section.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleFilter}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={!courseId || !semesterId || !sectionId}
        >
          Get Students
        </button>
      </div>

      {/* Student List */}
      {!isLoading && students?.length > 0 ? (
        <table className="w-full border text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Roll Number</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student) => (
              <tr key={student._id} className="text-center">
                <td className="border p-2">{student.rollNumber}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => setEditStudent(student)}
                    className="text-blue-500 underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteStudent(student)}
                    className="text-red-500 underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No students found.</p>
      )}

      {/* Edit Modal */}
      {editStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold">Edit Student</h3>

            {/* Roll Number */}
            <input
              className="w-full border p-2 mt-2"
              value={editStudent.rollNumber}
              onChange={(e) =>
                setEditStudent({ ...editStudent, rollNumber: e.target.value })
              }
              placeholder="Roll Number"
            />

            {/* Name */}
            <input
              className="w-full border p-2 mt-2"
              value={editStudent.name}
              onChange={(e) =>
                setEditStudent({
                  ...editStudent,
                  name: e.target.value.toUpperCase(),
                })
              }
              placeholder="Name"
            />

            {/* Course Selection */}
            <select
              className="w-full border p-2 mt-2"
              value={editStudent?.courseId || ""}
              onChange={(e) =>
                setEditStudent({ ...editStudent, courseId: e.target.value })
              }
            >
              <option value="">Select Course</option>
              {courses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>

            {/* Semester Selection */}
            <select
              className="w-full border p-2 mt-2"
              value={editStudent?.semesterId || ""}
              onChange={(e) =>
                setEditStudent({ ...editStudent, semesterId: e.target.value })
              }
            >
              <option value="">Select Semester</option>
              {semesters?.map((semester) => (
                <option key={semester._id} value={semester._id}>
                  {semester.name}
                </option>
              ))}
            </select>

            {/* Section Selection */}
            <select
              className="w-full border p-2 mt-2"
              value={editStudent.sectionId}
              onChange={(e) =>
                setEditStudent({ ...editStudent, sectionId: e.target.value })
              }
              disabled={!editStudent.courseId} // Ensure a course is selected first
            >
              <option value="">Select Section</option>
              {sections?.map((section) => (
                <option key={section._id} value={section._id}>
                  {section.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setEditStudent(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStudent}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p>Are you sure you want to delete {deleteStudent.name}?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setDeleteStudent(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStudent}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListStudent;

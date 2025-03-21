import React, { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useDeleteDurationMutation,
  useGetDurationQuery,
  useUpdateDurationMutation,
} from "../../redux/api/durationApiSlice";

const ListDuration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);

  const { data: courses, isLoading, isError, error } = useGetDurationQuery();
  const [updateCourse] = useUpdateDurationMutation();
  const [deleteCourse] = useDeleteDurationMutation();
  // Filter courses based on search input
  const filteredCourses =
    courses?.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleEdit = async (course) => {
    if (!course || !course._id) {
      console.error("Duration ID is undefined");
      return;
    }

    try {
      await updateCourse({ id: course._id, ...course }).unwrap();
      toast.success("Duration updated successfully!");
      setEditingCourse(null);
    } catch (error) {
      console.error("Error updating Duration:", error);
      toast.error("Failed to update Duration. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Duration ID is undefined");
      return;
    }

    try {
      await deleteCourse({ id }).unwrap();
      toast.success("Duration deleted successfully!");
      setDeletingCourse(null);
    } catch (error) {
      console.error("Error deleting Duration:", error);
      toast.error("Failed to delete Duration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Duration List
          </h1>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error: {error?.message}</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-gray-500">No courses found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <div
                key={course._id || course.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold">{course.name}</h3>

                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingCourse(course)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Course</h2>
            <input
              type="text"
              value={editingCourse.name}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, name: e.target.value })
              }
              className="w-full px-3 py-2 mb-3 border rounded"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingCourse(null)}
                className="text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEdit(editingCourse)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete "{deletingCourse.name}"?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setDeletingCourse(null)}
                className="text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleDelete(deletingCourse._id || deletingCourse.id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListDuration;

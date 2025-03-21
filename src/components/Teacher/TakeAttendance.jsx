import { useGetCourseQuery } from "../../redux/api/courseApiSlice";
import { useGetFilterStudentQuery } from "../../redux/api/studentsApiSlice";
import { useGetSemesterQuery } from "../../redux/api/semesterApiSlice";
import { useGetsSectionQuery } from "../../redux/api/sectionApiSlice";
import { useAddAttendanceMutation } from "../../redux/api/attendanceApiSlice";
import { useGetDurationQuery } from "../../redux/api/durationApiSlice";

import React, { useState, useEffect } from "react";

function TakeAttendance() {
  // Form state
  const [formData, setFormData] = useState({
    courseId: "",
    semesterId: "",
    durationId: "",
    sectionId: "",
  });

  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // RTK Query hooks
  const { data: courses, isLoading: isCoursesLoading } = useGetCourseQuery();
  const { data: semesters, isLoading: isSemestersLoading } =
    useGetSemesterQuery();
  const { data: durations, isLoading: isDurationsLoading } =
    useGetDurationQuery();
  const { data: sections, isLoading: isSectionsLoading } = useGetsSectionQuery(
    formData.courseId,
    {
      skip: !formData.courseId, // Skip fetching if no course is selected
    }
  );
  const {
    data: students = [],
    isLoading: isStudentsLoading,
    isFetching: isStudentsFetching,
    refetch: refetchStudents,
  } = useGetFilterStudentQuery(
    {
      courseId: formData.courseId,
      semesterId: formData.semesterId,
      durationId: formData.durationId,
      sectionId: formData.sectionId,
    },
    {
      skip:
        !formData.courseId ||
        !formData.semesterId ||
        !formData.durationId ||
        !formData.sectionId, // Skip fetching if any filter is missing
    }
  );

  // Mutation hook for submitting attendance
  const [addAttendance, { isLoading: isSubmitting }] =
    useAddAttendanceMutation();

  // Initialize attendance data when students are loaded
  useEffect(() => {
    if (students?.length > 0) {
      const initialAttendance = {};
      students.forEach((student) => {
        initialAttendance[student._id] = false; // Default attendance is false (absent)
      });
      setAttendance(initialAttendance);
    }
  }, [students]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle get students button click
  const handleGetStudents = (e) => {
    e.preventDefault();
    refetchStudents(); // Manually refetch students when the button is clicked
  };

  // Handle attendance status change
  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: isPresent,
    }));
  };

  // Handle submit attendance
  const handleSubmitAttendance = async () => {
    try {
      setLoading(true);

      // ✅ Check if all fields are filled
      if (
        !formData.courseId ||
        !formData.semesterId ||
        !formData.durationId ||
        !formData.sectionId
      ) {
        alert("❌ Please select all fields before submitting attendance.");
        return;
      }

      // ✅ Check if students exist
      if (Object.keys(attendance).length === 0) {
        alert("❌ No students found to submit attendance.");
        return;
      }

      // ✅ Convert attendance object to array format as required by backend
      const studentRecords = Object.entries(attendance).map(
        ([studentId, isPresent]) => ({
          studentId: studentId, // ✅ Perfect Key Name
          present: isPresent,
        })
      );

      // ✅ Final Payload As Required By Backend
      const submitData = {
        courseId: formData.courseId,
        semesterId: formData.semesterId,
        sectionId: formData.sectionId,
        durationId: formData.durationId,
        students: studentRecords, // ✅ Perfect Key Name
      };

      console.log("✅ Submitting Data:", submitData);

      // ✅ Submit attendance to API
      const res = await addAttendance(submitData).unwrap();

      console.log("✅ Attendance Submitted Successfully:", res);
      alert("✅ Attendance submitted successfully!");

      // ✅ Reset the form after submission
      setFormData({
        courseId: "",
        semesterId: "",
        durationId: "",
        sectionId: "",
      });
      setAttendance({});
    } catch (error) {
      console.error("❌ Failed to submit attendance:", error);
      if (error?.data?.message) {
        alert(`❌ Error: ${error.data.message}`);
      } else {
        alert("❌ Failed to submit attendance. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Loading state for the form
  const isFormLoading =
    isCoursesLoading ||
    isSemestersLoading ||
    isDurationsLoading ||
    isSectionsLoading;

  return (
    <div className="flex justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Attendance Form</h2>
        <form onSubmit={handleGetStudents} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Course Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <select
                name="courseId"
                value={formData.courseId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                disabled={isCoursesLoading}
              >
                <option value="">Select Course</option>
                {courses?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                name="semesterId"
                value={formData.semesterId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                disabled={isSemestersLoading}
              >
                <option value="">Select Semester</option>
                {semesters?.map((semester) => (
                  <option key={semester._id} value={semester._id}>
                    Semester {semester.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                name="durationId"
                value={formData.durationId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                disabled={isDurationsLoading}
              >
                <option value="">Select Duration</option>
                {durations?.map((duration) => (
                  <option key={duration._id} value={duration._id}>
                    {duration.name} ({duration.hours} hours)
                  </option>
                ))}
              </select>
            </div>

            {/* Section Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section
              </label>
              <select
                name="sectionId"
                value={formData.sectionId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                disabled={isSectionsLoading || !formData.courseId}
              >
                <option value="">Select Section</option>
                {sections?.map((section) => (
                  <option key={section._id} value={section._id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full flex justify-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              disabled={
                isFormLoading || isStudentsLoading || isStudentsFetching
              }
            >
              {isStudentsLoading || isStudentsFetching
                ? "Loading..."
                : "Get Students"}
            </button>
          </div>
        </form>

        {/* Student Attendance Table */}
        {students.length > 0 && (
          <div>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th className="border p-2">Roll Number</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className="border p-2">{student.rollNumber}</td>
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">
                      <input
                        type="checkbox"
                        className="w-6 h-6"
                        checked={attendance[student._id] || false}
                        onChange={(e) =>
                          handleAttendanceChange(student._id, e.target.checked)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Submit Button */}
            <button
              onClick={handleSubmitAttendance}
              disabled={loading || !students.length}
              className={`w-full p-3 text-white rounded-lg ${
                loading || !students.length
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Submitting..." : "Submit Attendance"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TakeAttendance;

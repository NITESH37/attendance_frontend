import { useState, useEffect } from "react";
import { useGetCourseQuery } from "../../redux/api/courseApiSlice";
import { useGetSemesterQuery } from "../../redux/api/semesterApiSlice";
import { useGetsSectionQuery } from "../../redux/api/sectionApiSlice";
import { useGetfilterAttendanceQuery } from "../../redux/api/attendanceApiSlice";

const AttendanceReport = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [queryParams, setQueryParams] = useState({
    course: "",
    semester: "",
    section: "",
    timestamp: 0,
  });

  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Fetch dropdown data
  const { data: courses, isLoading: coursesLoading } = useGetCourseQuery();
  const { data: semesters, isLoading: semestersLoading } =
    useGetSemesterQuery();
  const { data: sections, isLoading: sectionsLoading } = useGetsSectionQuery();

  // Fetch attendance data
  const {
    data: attendanceData,
    isLoading: attendanceLoading,
    refetch,
  } = useGetfilterAttendanceQuery(queryParams, { skip: !queryParams.course });

  // Clear table data when filters change
  useEffect(() => {
    setAttendanceRecords([]);
  }, [selectedCourse, selectedSemester, selectedSection]);

  // Update attendance data when new data is available
  useEffect(() => {
    if (attendanceData) {
      setAttendanceRecords(attendanceData);
    }
  }, [attendanceData]);

  // Handle form submission
  const handleGetAttendance = () => {
    if (!selectedCourse || !selectedSemester || !selectedSection) {
      alert("Please select Course, Semester, and Section.");
      return;
    }

    setQueryParams({
      course: selectedCourse,
      semester: selectedSemester,
      section: selectedSection,
      timestamp: Date.now(),
    });

    refetch();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Attendance Report
      </h2>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {coursesLoading ? (
            <option>Loading...</option>
          ) : (
            courses?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))
          )}
        </select>

        <select
          className="p-2 border rounded"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="">Select Semester</option>
          {semestersLoading ? (
            <option>Loading...</option>
          ) : (
            semesters?.map((semester) => (
              <option key={semester._id} value={semester._id}>
                {semester.name}
              </option>
            ))
          )}
        </select>

        <select
          className="p-2 border rounded"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="">Select Section</option>
          {sectionsLoading ? (
            <option>Loading...</option>
          ) : (
            sections?.map((section) => (
              <option key={section._id} value={section._id}>
                {section.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Get Attendance Button */}
      <button
        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleGetAttendance}
        disabled={attendanceLoading}
      >
        {attendanceLoading ? "Loading..." : "Get Attendance"}
      </button>

      {/* Attendance Table */}
      <div className="mt-6 overflow-x-auto">
        {attendanceLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : attendanceRecords.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Roll Number</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {[...attendanceRecords]
                .sort((a, b) => a.rollNumber - b.rollNumber)
                .map((student) => (
                  <tr key={student.rollNumber} className="text-center">
                    <td className="border p-2">{student.rollNumber}</td>
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">{student.percentage}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-4">No attendance records found.</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceReport;

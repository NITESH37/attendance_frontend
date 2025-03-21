import { ATTENDANCE_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAttendance: builder.mutation({
      query: (attendance) => ({
        url: `${ATTENDANCE_URL}/createAttendance`,
        method: "POST",
        body: attendance,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Attendance"],
    }),
    filterAttendance: builder.query({
      query: ({ courseId, semesterId, sectionId, durationId }) => {
        let queryString = `${ATTENDANCE_URL}/filterAttendance?`;

        if (courseId) queryString += `courseId=${courseId}&`;
        if (semesterId) queryString += `semesterId=${semesterId}&`;
        if (sectionId) queryString += `sectionId=${sectionId}&`;
        if (durationId) queryString += `durationId=${durationId}&`;

        return queryString;
      },
      providesTags: (result, error, arg) => [
        { type: "Attendance", id: arg.courseId }, // Unique cache tag per course
      ],
      keepUnusedDataFor: 0, // Ensures fresh data fetch when filters change
    }),

    getfilterAttendance: builder.query({
      query: ({ course, semester, section, timestamp }) => {
        if (!course || !semester || !section) {
          console.error("Missing required parameters:", {
            course,
            semester,
            section,
            timestamp,
          });
          return null; // Prevents making an invalid request
        }
        return {
          url: ATTENDANCE_URL,
          method: "GET",
          params: {
            course,
            semester,
            section,
            t: timestamp || Date.now(), // Ensuring timestamp is always present
          },
        };
      },
      providesTags: (result, error, { course, semester, section }) => [
        { type: "Attendance", id: `${course}-${semester}-${section}` },
      ],
      keepUnusedDataFor: 0, // Prevents caching old data
    }),
  }),
});

export const {
  useAddAttendanceMutation,
  useFilterAttendanceQuery,
  useGetfilterAttendanceQuery,
} = attendanceApiSlice;

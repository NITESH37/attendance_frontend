import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";
// import {
//   ATTENDANCE_URL,
//   AUTH_URL,
//   BASE_URl,
//   COURSE_URL,
//   DURATION_URL,
//   SECTION_URL,
//   SEMESTER_URL,
//   STUDENT_URL,
// } from "./constant";

// export const apliSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URl,
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//     responseHandler: async (response) => {
//       if (response.status === 401) {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       }
//       return response;
//     },
//   }),

//   tagTypes: ["Student", "User", "Course", "Semester", "Section", "Attendance"],

//   endpoints: (builder) => ({
//     getStudent: builder.query({
//       query: () => `${STUDENT_URL}/allStudents`,
//       providesTags: ["Student"],
//     }),
//     getFilterStudent: builder.query({
//       query: () => `${STUDENT_URL}/filterStudent`,
//       providesTags: ["Student"],
//     }),
//     getSelectedStudent: builder.query({
//       query: () => `${STUDENT_URL}/selectStudents`,
//       providesTags: ["Student"],
//     }),
//     addStudent: builder.mutation({
//       query: (student) => ({
//         url: `${STUDENT_URL}/createStudent`,
//         method: "POST",
//         body: student,
//       }),
//       invalidatesTags: ["Student"],
//     }),
//     updateStudent: builder.mutation({
//       query: ({ id, ...student }) => ({
//         url: `${STUDENT_URL}/${id}`,
//         method: "PUT",
//         body: student,
//       }),
//       invalidatesTags: ["Student"],
//     }),
//     deleteStudent: builder.mutation({
//       query: ({ id }) => ({
//         url: `${STUDENT_URL}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Student"],
//     }),

//     //Course api end point
//     addCourse: builder.mutation({
//       query: (course) => ({
//         url: `${COURSE_URL}/createCourse`,
//         method: "POST",
//         body: course,
//       }),
//       invalidatesTags: ["Course"],
//     }),
//     getCourse: builder.query({
//       query: () => `${COURSE_URL}/allCourse`,
//       providesTags: ["Course"],
//     }),
//     updateCourse: builder.mutation({
//       query: ({ id, ...course }) => ({
//         url: `${COURSE_URL}/${id}`,
//         method: "PUT",
//         body: course,
//       }),
//       invalidatesTags: ["Course"],
//     }),
//     deleteCourse: builder.mutation({
//       query: ({ id }) => ({
//         url: `${COURSE_URL}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Course"],
//     }),

//     //Semester api end point
//     addSemester: builder.mutation({
//       query: (semester) => ({
//         url: `${SEMESTER_URL}/createSemester`,
//         method: "POST",
//         body: semester,
//       }),
//       invalidatesTags: ["Semester"],
//     }),
//     getSemester: builder.query({
//       query: () => `${SEMESTER_URL}/allSemester`,
//       providesTags: ["Semester"],
//     }),
//     updateSemester: builder.mutation({
//       query: ({ id, ...semester }) => ({
//         url: `${SEMESTER_URL}/${id}`,
//         method: "PUT",
//         body: semester,
//       }),
//       invalidatesTags: ["Semester"],
//     }),
//     deleteSemester: builder.mutation({
//       query: ({ id }) => ({
//         url: `${SEMESTER_URL}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Semester"],
//     }),

//     //Section api endpoint

//     addSection: builder.mutation({
//       query: (section) => ({
//         url: `${SECTION_URL}/createSection`,
//         method: "POST",
//         body: section,
//       }),
//       invalidatesTags: ["Section"],
//     }),
//     getsSection: builder.query({
//       query: () => `${SECTION_URL}/allSection`,
//       providesTags: ["Section"],
//     }),
//     getsByIdSection: builder.query({
//       query: ({ id }) => `${SECTION_URL}/{id}`,
//       providesTags: ["Section"],
//     }),
//     updateSection: builder.mutation({
//       query: ({ id, ...section }) => ({
//         url: `${SECTION_URL}/${id}`,
//         method: "PUT",
//         body: section,
//       }),
//       invalidatesTags: ["Section"],
//     }),
//     deleteSection: builder.mutation({
//       query: ({ id }) => ({
//         url: `${SECTION_URL}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Section"],
//     }),

//     //Duration api end point
//     addDuration: builder.mutation({
//       query: (duration) => ({
//         url: `${DURATION_URL}/createDuration`,
//         method: "POST",
//         body: duration,
//       }),
//       invalidatesTags: ["Duration"],
//     }),
//     getDuration: builder.query({
//       query: () => `${DURATION_URL}/allDuration`,
//       providesTags: ["Duration"],
//     }),
//     updateDuration: builder.mutation({
//       query: ({ id, ...duration }) => ({
//         url: `${DURATION_URL}/${id}`,
//         method: "PUT",
//         body: duration,
//       }),
//       invalidatesTags: ["Duration"],
//     }),
//     deleteDuration: builder.mutation({
//       query: ({ id }) => ({
//         url: `${DURATION_URL}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Duration"],
//     }),

//     //Attendance api end point
//     addAttendance: builder.mutation({
//       query: (attendance) => ({
//         url: `${ATTENDANCE_URL}/createAttendance`,
//         method: "POST",
//         body: attendance,
//       }),
//       invalidatesTags: ["Attendance"],
//     }),

//     //Auth api end point
//     registerAuth: builder.mutation({
//       query: (register) => ({
//         url: `${AUTH_URL}/register`,
//         method: "POST",
//         body: register,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     loginAuth: builder.mutation({
//       query: (login) => ({
//         url: `${AUTH_URL}/login`,
//         method: "POST",
//         body: login,
//       }),
//       invalidatesTags: ["Auth"],
//     }),

//     logoutAuth: builder.query({
//       query: () => `${AUTH_URL}/logout`,
//       providesTags: ["Auth"],
//     }),
//   }),
// });

// export const {
//   useGetStudentQuery,
//   useGetFilterStudentQuery,
//   useGetSelectedStudentQuery,
//   useAddStudentMutation,
//   useDeleteStudentMutation,
//   useUpdateStudentMutation,

//   //Course
//   useAddCourseMutation,
//   useGetCourseQuery,
//   useDeleteCourseMutation,
//   useUpdateCourseMutation,

//   //Semester

//   useAddSemesterMutation,
//   useGetSemesterQuery,
//   useDeleteSemesterMutation,
//   useUpdateSemesterMutation,

//   //Section

//   useAddSectionMutation,
//   useDeleteSectionMutation,
//   useGetsByIdSectionQuery,
//   useGetsSectionQuery,
//   useUpdateSectionMutation,

//   //Duration
//   useAddDurationMutation,
//   useDeleteDurationMutation,
//   useGetDurationQuery,
//   useUpdateDurationMutation,

//   //Attendance
//   useAddAttendanceMutation,

//   //Authentication
//   useRegisterAuthMutation,
//   useLoginAuthMutation,
//   useLogoutAuthQuery,
// } = apliSlice;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Access the token from Redux state
    const token = getState().auth.token; // Assuming token is stored in auth slice
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Add the token to the header
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Student", "User", "Course", "Semester", "Section", "Attendance"],
  endpoints: () => ({}),
});

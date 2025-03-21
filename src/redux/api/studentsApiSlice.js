import { STUDENT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: () => `${STUDENT_URLL}/allStudents`,
      providesTags: ["Student"],
    }),
    getFilterStudent: builder.query({
      query: ({ courseId, semesterId, sectionId, durationId }) => {
        let queryString = `${STUDENT_URL}/filterStudent?`;

        if (courseId) queryString += `courseId=${courseId}&`;
        if (semesterId) queryString += `semesterId=${semesterId}&`;
        if (sectionId) queryString += `sectionId=${sectionId}&`;
        if (durationId) queryString += `durationId=${durationId}&`;

        return queryString;
      },
      providesTags: (result, error, arg) => [
        { type: "Student", id: arg.courseId }, // Unique tag per course
      ],
      keepUnusedDataFor: 0, // Forces refetch when parameters change
    }),

    getSelectedStudent: builder.query({
      query: () => `${STUDENT_URL}/selectStudents`,
      providesTags: ["Student"],
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: `${STUDENT_URL}/createStudent`,
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...student }) => {
        if (!id) {
          console.error("Error: Missing student ID in update request");
          return;
        }
        return {
          url: `${STUDENT_URL}/${id}`,
          method: "PUT",
          body: JSON.stringify(student), // Ensure proper JSON formatting
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["Student"],
    }),

    deleteStudent: builder.mutation({
      query: ({ id }) => {
        if (!id) {
          console.error("Error: Missing student ID in delete request");
          return;
        }
        return {
          url: `${STUDENT_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentQuery,
  useGetFilterStudentQuery,
  useGetSelectedStudentQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentsApiSlice;

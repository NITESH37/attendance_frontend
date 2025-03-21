import { SEMESTER_URL } from "../constant";
import { apiSlice } from "./apiSlice";
import { courseApiSlice } from "./courseApiSlice";

export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSemester: builder.mutation({
      query: (semester) => ({
        url: `${SEMESTER_URL}/createSemester`,
        method: "POST",
        body: semester,
      }),
      invalidatesTags: ["Semester"],
    }),
    getSemester: builder.query({
      query: () => `${SEMESTER_URL}/allSemester`,
      providesTags: ["Semester"],
    }),
    updateSemester: builder.mutation({
      query: ({ id, ...semester }) => ({
        url: `${SEMESTER_URL}/${id}`,
        method: "PUT",
        body: semester,
      }),
      invalidatesTags: ["Semester"],
    }),
    deleteSemester: builder.mutation({
      query: ({ id }) => ({
        url: `${SEMESTER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Semester"],
    }),
  }),
});

export const {
  useAddSemesterMutation,
  useGetSemesterQuery,
  useDeleteSemesterMutation,
  useUpdateSemesterMutation,
} = courseApiSlice;

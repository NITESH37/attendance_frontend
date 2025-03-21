import { COURSE_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (course) => ({
        url: `${COURSE_URL}/createCourse`,
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Course"],
    }),
    getCourse: builder.query({
      query: () => `${COURSE_URL}/allCourse`,
      providesTags: ["Course"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...course }) => ({
        url: `${COURSE_URL}/${id}`, // Ensure `id` is properly appended
        method: "PUT",
        body: course,
      }),
      invalidatesTags: ["Course"],
    }),

    deleteCourse: builder.mutation({
      query: ({ id }) => ({
        url: `${COURSE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCourseQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApiSlice;

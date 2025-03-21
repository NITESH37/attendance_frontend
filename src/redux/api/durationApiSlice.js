import { DURATION_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const durationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDuration: builder.mutation({
      query: (duration) => ({
        url: `${DURATION_URL}/createDuration`,
        method: "POST",
        body: duration,
      }),
      invalidatesTags: ["Duration"],
    }),
    getDuration: builder.query({
      query: () => `${DURATION_URL}/allDuration`,
      providesTags: ["Duration"],
    }),
    updateDuration: builder.mutation({
      query: ({ id, ...duration }) => ({
        url: `${DURATION_URL}/${id}`,
        method: "PUT",
        body: duration,
      }),
      invalidatesTags: ["Duration"],
    }),
    deleteDuration: builder.mutation({
      query: ({ id }) => ({
        url: `${DURATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Duration"],
    }),
  }),
});

export const {
  useAddDurationMutation,
  useDeleteDurationMutation,
  useGetDurationQuery,
  useUpdateDurationMutation,
} = durationApiSlice;

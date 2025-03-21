import { SECTION_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const sectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSection: builder.mutation({
      query: (section) => ({
        url: `${SECTION_URL}/createSection`,
        method: "POST",
        body: section,
      }),
      invalidatesTags: ["Section"],
    }),
    getsSection: builder.query({
      query: () => `${SECTION_URL}/allSection`,
      providesTags: ["Section"],
    }),
    getsByIdSection: builder.query({
      query: ({ id }) => `${SECTION_URL}/{id}`,
      providesTags: ["Section"],
    }),
    updateSection: builder.mutation({
      query: ({ id, ...section }) => ({
        url: `${SECTION_URL}/${id}`,
        method: "PUT",
        body: section,
      }),
      invalidatesTags: ["Section"],
    }),
    deleteSection: builder.mutation({
      query: ({ id }) => ({
        url: `${SECTION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Section"],
    }),
  }),
});

export const {
  useAddSectionMutation,
  useDeleteSectionMutation,
  useGetsByIdSectionQuery,
  useGetsSectionQuery,
  useUpdateSectionMutation,
} = sectionApiSlice;

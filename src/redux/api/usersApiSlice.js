import { AUTH_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerAuth: builder.mutation({
      query: (register) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: register,
      }),
      invalidatesTags: ["User"],
    }),
    loginAuth: builder.mutation({
      query: (login) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: login,
      }),
      invalidatesTags: ["User"],
    }),

    logoutAuth: builder.query({
      query: () => `${AUTH_URL}/logout`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterAuthMutation,
  useLoginAuthMutation,
  useLogoutAuthQuery,
} = usersApiSlice;

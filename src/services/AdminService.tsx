import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Admin from "../lib/models/AdminModel";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LOCAL_HOST_API_URL,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ["Admins"],
  endpoints: (builder) => ({
    addAdmin: builder.mutation<Admin, Admin | any>({
      query(admin: Admin) {
        return {
          url: `admins`,
          method: "POST",
          body: admin,
        };
      },
      invalidatesTags: ["Admins"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddAdminMutation } = adminApi;

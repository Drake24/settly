import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Admin from '../lib/models/AdminModel'
import Response from '../lib/enums/Response';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LOCAL_HOST_API_URL,
    prepareHeaders: (headers, {getState}) => {
      return headers
    },   
  }),
  tagTypes: ['Authentication'],
  endpoints: (builder) => ({
    authenticate: builder.mutation<Admin, { email: string, password: string}>({
      query(user: Admin) {
        return {
          url: `authenticate`,
          method: 'POST',   
          body: user,
        }
      },
      transformResponse: (response: Response) => { return response.data as Admin},
      invalidatesTags: ['Authentication'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useAuthenticateMutation} = authenticationApi

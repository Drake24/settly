import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Client from "../lib/models/ClientModel";
import { RootState } from "../store/store";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LOCAL_HOST_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).authentication.user
        .apiToken;
      headers.set("Authorization", `Bearer ${accessToken}`);
      return headers;
    },
  }),
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => "clients",
      transformResponse: (response: any) => response.data,
      providesTags: ["Clients"],
    }),

    // Use void if no return or query parameter to be pass
    getClient: builder.query<Client, number>({
      query: (id) => `clients/${id}`,
      providesTags: ["Clients"],
    }),

    addClient: builder.mutation<Client, Client>({
      query(client: Client) {
        const { file } = client;
        const formData = new FormData();
        formData.append("file", file as string);
        return {
          url: `clients`,
          method: "POST",
          body: client,
        };
      },
      // Invalidates the Clients tag
      invalidatesTags: ["Clients"],
    }),

    deleteClient: builder.mutation<Client, Client>({
      query(client: Client) {
        const { id } = client;
        return {
          url: `clients/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Clients"],
    }),

    updateClient: builder.mutation<Client, Client>({
      query(client: Client) {
        const { id } = client;
        return {
          url: `clients/${id}`,
          method: "PATCH",
          body: client,
        };
      },
      invalidatesTags: ["Clients"],
    }),

    // Add more here
  }),

  // endpoints: (builder) => ({
  //   getUser: builder.query<ResponseWithLink<User>, null>({
  //     query: () => {
  //       return endpoint('GET /user');
  //     },
  // }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetClientsQuery,
  useAddClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} = clientApi;

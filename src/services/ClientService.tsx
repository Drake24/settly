import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import Client from "../lib/models/ClientModel";

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
        const formData = new FormData();

        Object.entries(client).forEach(([key, value]) => {
          formData.append(key, value);
        });
        console.log(formData);
        return {
          url: `clients`,
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Accept, Content-type",
          },
          body: formData,
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
        console.log(client);
        const formData = new FormData();

        Object.entries(client).forEach(([key, value]) => {
         
          formData.append(key, value);
        });

        console.log(formData);
        return {
          url: `clients/update/${id}`,
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Accept, Content-type",
          },
          body: formData,
        };
      },
      invalidatesTags: ["Clients"],
    }),

    // Add more here
  }),
});

export const {
  useGetClientsQuery,
  useAddClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} = clientApi;

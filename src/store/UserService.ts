import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/authutils";

export const userServiceApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }), // Assuming /api is the endpoint for the backend
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<any, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/auth",
        headers: {
          Authorization: `Bearer ${getToken()}`, // Add your custom header here
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useLoginMutation, useRegisterMutation } =
  userServiceApi;

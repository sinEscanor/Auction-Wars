import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { getToken } from "../utils/authutils";

export const aucServiceApi = createApi({
  reducerPath: "AucApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAuctions: builder.query<any, void>({
      query: () => "/auction",
      keepUnusedDataFor: 300,
    }),
    getAuction: builder.query<AuctionResponse, string>({
      query: (id) => `/auction/${id}`,
    }),
    postAuction: builder.mutation<Auction, AuctionRequest>({
      query: (body: AuctionRequest) => ({
        url: "/auction",
        method: "POST",
        body,
      }),
    }),
    startAuction: builder.mutation<void, string>({
      query: (id) => ({
        url: `/auction/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAuctionsQuery,
  useGetAuctionQuery,
  usePostAuctionMutation,
  useStartAuctionMutation,
} = aucServiceApi;

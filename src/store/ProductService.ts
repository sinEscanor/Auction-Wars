import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/authutils";
// const token = getToken();
export const productServiceApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        console.log(token);
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => "/product",
      keepUnusedDataFor: 300,
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/product/${id}`,
    }),
    postProduct: builder.mutation<Product, Product>({
      query: (body) => ({
        url: "/product",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePostProductMutation,
} = productServiceApi;

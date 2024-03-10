import { PRODUCTs_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ()=> ({
        url:  PRODUCTs_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetail: builder.query({
      query: (productId)=> ({
        url: `${PRODUCTs_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {useGetProductsQuery, useGetProductDetailQuery} = productsApiSlice;
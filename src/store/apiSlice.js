import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/'}),
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: (limit=7)=> `products?limit=${limit}`,
        }),
        getProductsByCategory: builder.query({
            query: (category)=>`products/category/${category}?limit=7`,
        }),
        searchProducts: builder.query({
            query: (term)=>`products/search?q=${term}`,
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductsByCategoryQuery,
    useSearchProductsQuery
} = apiSlice;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/'}),
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: (limit=30)=> `products?limit=${limit}`,
        }),
        getProductsByCategory: builder.query({
            query: (category)=>`products/category/${category}?limit=7`,
        }),
        searchProducts: builder.query({
            query: (arg) => {
                const { q, limit = 100 } = typeof arg === 'string' ? { q: arg } : arg;
                return `products/search?q=${q}&limit=${limit}`;
            },
        }),
        getProductById: builder.query({
            query: (id)=> `products/${id}`,
        }),
        login: builder.mutation({
            query: (credentials)=>({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductsByCategoryQuery,
    useSearchProductsQuery,
    useGetProductByIdQuery,
    useLoginMutation
} = apiSlice;
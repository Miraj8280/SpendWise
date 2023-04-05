import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:8080';

export const apiSlice = createApi({
    baseQuery : fetchBaseQuery({baseUrl:baseURI}),
    endpoints : builder => ({
        // get categories
        getCategories : builder.query({
            query : () => '/api/categories',
            providesTags : ['categories']
        }),

        // get labels
        getLabels : builder.query({
            query : () => '/api/labels',
            providesTags : ['transactions']
        }),

        // add new transaction
        addTransactions : builder.mutation({
            query : (initialTransaction) => ({
                url : '/api/transactions',
                method : 'POST',
                body : initialTransaction
            }),
            invalidatesTags : ['transactions']
        }),

        // delete record
        deleteTransaction : builder.mutation({
            query : recordId => ({
                url : '/api/transactions',
                method : 'DELETE',
                body : recordId
            }),
            invalidatesTags : ['transactions']
        })
    })
})

export default apiSlice;
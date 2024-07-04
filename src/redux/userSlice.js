import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getToken = () => localStorage.getItem('token')

export const currentApiSlice = createApi({
  reducerPath: 'currentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://org-management-node.onrender.com/api/',
    prepareHeaders: (headers) => {
      const token = getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['CurrentUser'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => 'users/current',
      providesTags: ['CurrentUser'],
    }),
  }),
})

export const { useGetCurrentUserQuery } = currentApiSlice

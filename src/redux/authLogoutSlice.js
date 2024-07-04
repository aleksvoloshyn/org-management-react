import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//make headers from localStorage
const getHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

// API for logout
export const logoutApi = createApi({
  reducerPath: 'logout',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://org-management-node.onrender.com/api',
    prepareHeaders: (headers) => {
      return {
        ...headers,
        ...getHeaders(),
      }
    },
  }),
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'CurrentUser'],
    }),
  }),
})

export const { useLogoutMutation } = logoutApi

export default logoutApi.reducer

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

export const logoutApi = createApi({
  reducerPath: 'logout',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://org-management-node.onrender.com/api',
    prepareHeaders: (headers) => {
      const newHeaders = new Headers(headers)
      const token = localStorage.getItem('token')
      if (token) {
        newHeaders.set('Authorization', `Bearer ${token}`)
      }
      newHeaders.set('Content-Type', 'application/json')
      return newHeaders
    },
  }),
  endpoints: (builder) => ({
    // LOGOUT
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

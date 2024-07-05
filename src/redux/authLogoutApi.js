import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/baseUrl'

export const logoutApi = createApi({
  reducerPath: 'logout',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
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

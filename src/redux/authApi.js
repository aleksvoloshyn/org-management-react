import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/baseUrl'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // LOGIN (SignIn)
    addSignin: builder.mutation({
      query: (values) => ({
        url: `/auth/signin`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Auth', 'CurrentUser'],
    }),
    // REGISTER (SignUp)
    addSignup: builder.mutation({
      query: (values) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { useAddSigninMutation, useAddSignupMutation } = authApi

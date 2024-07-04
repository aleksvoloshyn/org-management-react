import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { currentApiSlice } from './userSlice'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://org-management-node.onrender.com/api',
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    addSignin: builder.mutation({
      query: (values) => ({
        url: `/auth/signin`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Auth', 'CurrentUser'],
    }),

    addSignup: builder.mutation({
      query: (values) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Auth'],
    }),
    // LOGOUT
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'CurrentUser'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(currentApiSlice.util.resetApiState()) // Сброс состояния текущего пользователя
        } catch {
          // Обработка ошибок
        }
      },
    }),
  }),
})

export const { useAddSigninMutation, useAddSignupMutation, useLogoutMutation } =
  authApi

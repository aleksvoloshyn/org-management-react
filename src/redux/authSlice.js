import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Создание API
export const authApi = createApi({
  reducerPath: 'auth', // Имя для reducer в Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://org-management-node.onrender.com/api', // Базовый URL API
  }),
  tagTypes: ['Auth'], // Типы тегов для инвалидации кэша
  endpoints: (builder) => ({
    addSignin: builder.mutation({
      // Конфигурация запроса для входа
      query: (values) => ({
        url: `/auth/signin`, // Конечная точка для входа
        method: 'POST',
        body: values, // Данные запроса (например, email и password)
      }),
      invalidatesTags: ['Auth'], // Инвалидация кэша по тегу 'Auth'
    }),
    addSignup: builder.mutation({
      // Конфигурация запроса для регистрации
      query: (values) => ({
        url: `/auth/signup`, // Конечная точка для регистрации пользователя
        method: 'POST',
        body: values, // Данные запроса (например, email, password, и др.)
      }),
      invalidatesTags: ['Auth'], // Инвалидация кэша по тегу 'Auth'
    }),
    logout: builder.mutation({
      // Конфигурация запроса для выхода
      query: () => ({
        url: `/auth/logout`, // Конечная точка для выхода пользователя
        method: 'POST',
      }),
      invalidatesTags: ['Auth'], // Инвалидация кэша по тегу 'Auth'
    }),
  }),
})

// Экспорт хуков для использования в функциональных компонентах
export const { useAddSigninMutation, useAddSignupMutation, useLogoutMutation } =
  authApi

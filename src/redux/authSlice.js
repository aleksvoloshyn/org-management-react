import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'auth', // Имя для reducer в Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://org-management-node.onrender.com/api', // Базовый URL API
  }),
  tagTypes: ['Auth'], // Типы тегов для инвалидации кэша
  endpoints: (builder) => ({
    addSignin: builder.mutation({
      // Конфигурация запроса для добавления пользователя
      query: (values) => ({
        url: `/auth/signin`, // Конечная точка для регистрации пользователя
        method: 'POST',
        body: values, // Данные запроса (например, email и password)
      }),
      invalidatesTags: ['Auth'], // Инвалидация кэша по тегу 'Auth'
    }),
  }),
})

// Экспорт хуков для использования в функциональных компонентах,
// которые генерируются автоматически на основе определенных конечных точек
export const { useAddSigninMutation } = authApi

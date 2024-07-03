import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Функция для получения заголовков запроса с токеном из localStorage
const getHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

// Создание API для logout
export const logoutApi = createApi({
  reducerPath: 'logout', // Имя для reducer в Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://org-management-node.onrender.com/api', // Базовый URL API
    prepareHeaders: (headers) => {
      return {
        ...headers,
        ...getHeaders(),
      }
    },
  }),
  endpoints: (builder) => ({
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
export const { useLogoutMutation } = logoutApi

// Экспорт reducer для использования в Redux store
export default logoutApi.reducer

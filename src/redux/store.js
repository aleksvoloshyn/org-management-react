import { configureStore } from '@reduxjs/toolkit'
import { companiesApi } from './companiesSlice'
import { authApi } from './authSlice'

const store = configureStore({
  reducer: {
    [companiesApi.reducerPath]: companiesApi.reducer,
    [authApi.reducerPath]: authApi.reducer, // Добавляем редюсер для authApi
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    companiesApi.middleware,
    authApi.middleware, // Добавляем middleware для authApi
  ],
})
export default store

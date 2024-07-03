import { configureStore } from '@reduxjs/toolkit'
import { companiesApi } from './companiesSlice'
import { authApi } from './authSlice'
import logoutApiReducer from './authLogoutSlice'

const store = configureStore({
  reducer: {
    [companiesApi.reducerPath]: companiesApi.reducer,
    [authApi.reducerPath]: authApi.reducer, // Добавляем редюсер для authApi
    logout: logoutApiReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    companiesApi.middleware,
    authApi.middleware, // Добавляем middleware для authApi
  ],
})
export default store

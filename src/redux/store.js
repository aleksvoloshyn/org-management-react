import { configureStore } from '@reduxjs/toolkit'
import { companiesApi } from './companiesSlice'
import { authApi } from './authSlice'
import { currentApiSlice } from './userSlice'
import logoutApiReducer from './authLogoutSlice'

const store = configureStore({
  reducer: {
    [companiesApi.reducerPath]: companiesApi.reducer,
    [currentApiSlice.reducerPath]: currentApiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    logout: logoutApiReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    companiesApi.middleware,
    authApi.middleware,
    currentApiSlice.middleware,
  ],
})
export default store

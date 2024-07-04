import { configureStore } from '@reduxjs/toolkit'
import { companiesApi } from './companiesApi'
import { authApi } from './authApi'
import { usersApi } from './usersApi'
import { logoutApi } from './authLogoutApi'
// import logoutApiReducer from './authLogoutApi'

const store = configureStore({
  reducer: {
    [companiesApi.reducerPath]: companiesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    // [logoutApi.reducerPath]: logoutApi.reducer,
    logout: logoutApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    companiesApi.middleware,
    authApi.middleware,
    usersApi.middleware,
    logoutApi.middleware,
  ],
})
export default store

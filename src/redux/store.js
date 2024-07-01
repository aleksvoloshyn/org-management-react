import { configureStore } from '@reduxjs/toolkit'
import { goodsApi } from './goodsApi'
import { contactsApi } from './contactsApi'

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(goodsApi.middleware, contactsApi.middleware),
})

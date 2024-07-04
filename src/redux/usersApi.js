import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getToken = () => localStorage.getItem('token')

export const usersApi = createApi({
  reducerPath: 'currentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://org-management-node.onrender.com/api/users',
    prepareHeaders: (headers) => {
      const token = getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['CurrentUser'],
  endpoints: (builder) => ({
    // GET СURRENT USER
    getCurrentUser: builder.query({
      query: () => 'current',
      providesTags: ['CurrentUser'],
    }),
    //GET  USERLIST
    getUsersList: builder.query({
      query: () => 'userslist',
      providesTags: ['UserList'],
    }),
    // GET USER PROFILE BY TOKEN
    getProfile: builder.query({
      query: () => 'profile',
      providesTags: ['UserProfile'],
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useGetUsersListQuery,
  useGetProfileQuery,
} = usersApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/baseUrl'

const getToken = () => localStorage.getItem('token')

export const usersApi = createApi({
  reducerPath: 'currentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}users`,
    prepareHeaders: (headers) => {
      const token = getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['CurrentUser', 'UserList', 'UserProfile'],
  endpoints: (builder) => ({
    // GET CURRENT USER
    getCurrentUser: builder.query({
      query: () => 'current',
      providesTags: ['CurrentUser'],
    }),
    // GET USER LIST
    getUsersList: builder.query({
      query: () => 'userslist',
      providesTags: ['UserList'],
    }),
    // GET USER PROFILE BY TOKEN
    getProfile: builder.query({
      query: () => 'profile',
      providesTags: ['UserProfile'],
    }),
    // UPDATE USER PROFILE
    updateProfile: builder.mutation({
      query: ({ _id, ...userData }) => ({
        url: `${_id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useGetUsersListQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = usersApi

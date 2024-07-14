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
    // GET USER  BY ID
    getUserById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['UserProfile'],
    }),
    // UPDATE USER PROFILE
    updateProfile: builder.mutation({
      query: ({ _id, ...userData }) => ({
        url: `${_id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['UserProfile', 'UserList'],
    }),
    // DELETE USER
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UserProfile', 'UserList'],
    }),
    // SET ADMIN RIGHTS
    setAdminRights: builder.mutation({
      query: ({ id, isAdmin }) => ({
        url: `${id}/isAdmin`,
        method: 'PATCH',
        body: { isAdmin },
      }),
      invalidatesTags: ['UserProfile', 'UserList'],
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useGetUsersListQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useSetAdminRightsMutation,
} = usersApi

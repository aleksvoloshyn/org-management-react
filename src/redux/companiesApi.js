import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/baseUrl'

const getToken = () => {
  return localStorage.getItem('token')
}
export const companiesApi = createApi({
  reducerPath: 'companies',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Company'],

  endpoints: (builder) => ({
    // GET ALL COMPANIES
    getCompanies: builder.query({
      query: () => `/companies`,
      providesTags: ['Company'],
    }),
    // GET ALL COMPANIES (from all users)
    getCompaniesAdmin: builder.query({
      query: () => `/companies/admin/all`,
      providesTags: ['Company'],
    }),
    // ADD NEW COMPANY
    addCompany: builder.mutation({
      query: (newCompany) => ({
        url: '/companies',
        method: 'POST',
        body: newCompany,
      }),
      invalidatesTags: ['Company'],
    }),
    // GET COMPANY BY ID
    getCompanyById: builder.query({
      query: (id) => `/companies/${id}`,
      providesTags: ['Company'],
    }),
    // COMPANY EDIT
    updateCompany: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body: update,
      }),
      invalidatesTags: ['Company'],
    }),
    // DELETE COMPANY
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),
  }),
})

export const {
  useGetCompaniesQuery,
  useAddCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetCompaniesAdminQuery,
  useGetCompanyByIdQuery,
} = companiesApi

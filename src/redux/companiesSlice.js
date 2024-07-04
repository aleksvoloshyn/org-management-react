import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getToken = () => {
  return localStorage.getItem('token')
}
export const companiesApi = createApi({
  reducerPath: 'companies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://org-management-node.onrender.com/api',
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
    getCompanies: builder.query({
      query: () => `/companies`,
      providesTags: ['Company'],
    }),
    addCompany: builder.mutation({
      query: (newCompany) => ({
        url: '/companies',
        method: 'POST',
        body: newCompany,
      }),
      invalidatesTags: ['Company'], // Инвалидируем теги для обновления списка компаний
    }),
    updateCompany: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body: update,
      }),
      invalidatesTags: ['Company'],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCompaniesQuery,
  useAddCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApi

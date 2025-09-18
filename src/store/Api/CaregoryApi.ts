import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../utils/baseUrl';

export interface ICategory {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => '/categories',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;

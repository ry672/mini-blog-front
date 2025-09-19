import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { baseUrl } from "../../utils/baseUrl";
import { IPost } from "./PostApi";

// Интерфейс категории с постами
export interface ICategory {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  posts?: IPost[];
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Получение всех категорий
    getCategories: builder.query<ICategory[], void>({
      query: () => "/categories",
    }),

    // Получение одной категории с постами по ID
    getCategoryById: builder.query<ICategory, number>({
      query: (id) => `/categories/${id}`,
    }),

    // Создание новой категории
    createCategory: builder.mutation<ICategory, { name: string; description: string }>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
} = categoryApi;


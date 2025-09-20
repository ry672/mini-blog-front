import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";
import { RootState } from "../store"; // 👈 импорт RootState для доступа к токену

export interface ICategory {
  id: number;
  name: string;
  description: string;
  posts?: any[];
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => "/categories",
      providesTags: (result) =>
        result
          ? [
              ...result.map((cat) => ({ type: "Category" as const, id: cat.id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    getCategoryById: builder.query<ICategory, number>({
      query: (id) => `/categories/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Category", id }],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;






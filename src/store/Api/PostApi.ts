// src/store/Api/PostApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";
import { RootState } from "../store"; 

export interface IPost {
  id: number;
  title: string;
  content: string;
  images: string[];
  userId: number;
  categoryId?: number;
  likedUserIds: number[];
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  likedByUser: boolean;
}

// Новый интерфейс для параметров createPost мутации
export interface ICreatePostParams {
  userId: number;
  formData: FormData;
}

export const postApi = createApi({
  reducerPath: "postApi",
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
  
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => "/posts",
    }),
    

    createPost: builder.mutation<IPost, { userId: number; formData: FormData }>({
      query: ({ userId, formData }) => ({
        url: `/posts/${userId}`,
        method: "POST",
        body: formData,
      }),
    }),
    getPostById: builder.query<IPost, number>({
      query: (postId) => `/posts/${postId}`,
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useGetPostByIdQuery } = postApi;





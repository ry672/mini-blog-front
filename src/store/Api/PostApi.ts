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
  categoryId: number;
  likedUserIds: number[];
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  likedByUser: boolean;
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
  }),
});

export const { useGetPostsQuery } = postApi;



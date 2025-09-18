// store/Api/CommentApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { baseUrl } from "../../utils/baseUrl";

interface IComment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export const commentApi = createApi({
  reducerPath: "commentApi",
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
    getCommentsByPostId: builder.query<IComment[], number>({
      query: (postId) => `/comments/post/${postId}`,
    }),
  }),
});

export const { useGetCommentsByPostIdQuery } = commentApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { baseUrl } from "../../utils/baseUrl";


export interface IComment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
  author?: {
    username?: string,
    profile_photo?: string;
    id?: number
  }
  
}

export interface CommentsListProps {
  comments: IComment[];
  
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
  tagTypes: ["Comment"], // объявляем тег

  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<IComment[], number>({
      query: (postId) => `/comments/post/${postId}`,
      providesTags: (result) =>
        result
          ? [
              // Тег для каждого комментария
              ...result.map(({ id }) => ({ type: "Comment" as const, id })),
              // Тег для списка
              { type: "Comment", id: "LIST" },
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
    createComment: builder.mutation<IComment, { postId: number; content: string }>({
      query: ({ postId, content }) => ({
        url: `/comments/${postId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }], // обновить список после создания
    }),
    deleteComment: builder.mutation<{ message: string }, number>({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Comment", id },         // удаляем конкретный комментарий из кеша
        { type: "Comment", id: "LIST" }, // обновляем весь список
      ],
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;

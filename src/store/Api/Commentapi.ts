
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
  tagTypes: ["Comment"], 

  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<IComment[], number>({
      query: (postId) => `/comments/post/${postId}`,
      providesTags: (result) =>
        result
          ? [
              
              ...result.map(({ id }) => ({ type: "Comment" as const, id })),
              
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
      invalidatesTags: [{ type: "Comment", id: "LIST" }], 
    }),
    deleteComment: builder.mutation<{ message: string }, number>({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Comment", id },         
        { type: "Comment", id: "LIST" }, 
      ],
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";
import { RootState } from "../store";
import { categoryApi } from "./CaregoryApi";

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
  likesCount?: number;
  likedByUser?: boolean;
}

export interface ICreatePostParams {
  userId: number;
  formData: FormData;
}

export interface ILikedResponse {
  liked: boolean;
  post: IPost;
}
export interface PostCardProps {
  post: IPost;
}

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Posts", "Post", "Category"],
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    getPostsByUserId: builder.query<IPost[], number>({
      query: (userId) => `/posts/user/${userId}`,
      providesTags: (result, _err, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Posts", id: userId },
            ]
          : [{ type: "Posts", id: userId }],
    }),

    getPostById: builder.query<IPost, number>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (_res, _err, id) => [{ type: "Post", id }],
    }),

    createPost: builder.mutation<IPost, ICreatePostParams>({
      query: ({ userId, formData }) => ({
        url: `/posts/${userId}`,
        method: "POST",
        body: formData,
      }),
      async onQueryStarted({ userId}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Обновляем главную ленту
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.unshift(data); // добавляем новый пост сверху
            })
          );

          // Обновляем категорию, если есть categoryId
          if (data.categoryId) {
            dispatch(
              categoryApi.util.updateQueryData(
                "getCategoryById",
                data.categoryId,
                (draft) => {
                  draft.posts = draft.posts ? [data, ...draft.posts] : [data];
                }
              )
            );
          }

          // Обновляем список категорий
          dispatch(
            categoryApi.util.updateQueryData("getCategories", undefined, (draft) => {
              draft.forEach((cat) => {
                if (cat.id === data.categoryId) {
                  cat.posts = cat.posts ? [data, ...cat.posts] : [data];
                }
              });
            })
          );
        } catch {
          dispatch(postApi.util.invalidateTags([{ type: "Posts", id: "LIST" }]));
          if (userId) {
            dispatch(categoryApi.util.invalidateTags([{ type: "Category", id: userId }]));
          }
        }
      },
      invalidatesTags: (_res, _err, { userId }) => [
        { type: "Posts", id: userId },
        { type: "Posts", id: "LIST" },
      ],
    }),

    likePost: builder.mutation<ILikedResponse, number>({
      query: (postId) => ({
        url: `/posts/${postId}/like`,
        method: "POST",
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        try {
          // Оптимистично обновляем главную ленту
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const p = draft.find((x) => x.id === postId);
              if (p) {
                const wasLiked = !!p.likedByUser;
                p.likedByUser = !wasLiked;
                p.likesCount = (p.likesCount ?? 0) + (wasLiked ? -1 : 1);
              }
            })
          );

          // Оптимистично обновляем категорию
          dispatch(
            categoryApi.util.updateQueryData("getCategories", undefined, (draft) => {
              draft.forEach((cat) => {
                const post = cat.posts?.find((x) => x.id === postId);
                if (post) {
                  const wasLiked = !!post.likedByUser;
                  post.likedByUser = !wasLiked;
                  post.likesCount = (post.likesCount ?? 0) + (wasLiked ? -1 : 1);
                }
              });
            })
          );

          const { data } = await queryFulfilled;

          // Синхронизируем главную ленту
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const idx = draft.findIndex((d) => d.id === data.post.id);
              if (idx !== -1) draft[idx] = data.post;
            })
          );

          // Синхронизируем категорию по ID
          if (data.post.categoryId) {
            dispatch(
              categoryApi.util.updateQueryData(
                "getCategoryById",
                data.post.categoryId,
                (draft) => {
                  const idx = draft.posts?.findIndex((p) => p.id === data.post.id);
                  if (idx !== undefined && idx !== -1 && draft.posts) {
                    draft.posts[idx] = data.post;
                  }
                }
              )
            );

            dispatch(
              categoryApi.util.updateQueryData("getCategories", undefined, (draft) => {
                draft.forEach((cat) => {
                  const idx = cat.posts?.findIndex((p) => p.id === data.post.id);
                  if (idx !== undefined && idx !== -1 && cat.posts) {
                    cat.posts[idx] = data.post;
                  }
                });
              })
            );
          }
        } catch {
          dispatch(postApi.util.invalidateTags([{ type: "Post", id: postId }]));
          dispatch(categoryApi.util.invalidateTags([{ type: "Category", id: "LIST" }]));
        }
      },
      invalidatesTags: (result, _error, postId) => [
        { type: "Post" as const, id: postId },
        { type: "Posts" as const, id: "LIST" },
        ...(result?.post.categoryId ? [{ type: "Category" as const, id: result.post.categoryId }] : []),
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useLikePostMutation,
} = postApi;











// store/Api/userApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";
import { RootState } from "../store";
import { IPost } from "./PostApi";
import { IComment } from "./Commentapi";

export interface IUser {
  id: number;
  name: string;
  surname?: string;
  username: string;
  phone_number: string;
  email: string;
  refresh_token_hash?: string;
  city: string;
  profile_photo?: string | null;
  createdAt?: string;
  updatedAt?: string;
  roles?: string[];
}

export interface IMe extends IUser {
  posts?: IPost[];
  comments?: IComment[];
}
export interface IAvatarResponse {
  id: number;
  name: string;
  surname?: string;
  username: string;
  phone_number: string;
  email: string;
  refresh_token_hash?: string;
  city: string;
  profile_photo?: string | null; // <- обязательно сделать optional!
  createdAt?: string;
  updatedAt?: string;
  roles?: string[];
  posts?: IPost[];
  comments?: IComment[];
}


export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IMe, void>({
      query: () => "/me",
      providesTags: ["User"], 
    }),
    getUsers: builder.query<IUser[], void>({
      query: () => "/users",
    }),
    getUserById: builder.query<IUser, number>({
      query: (id) => `/users/id/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    uploadAvatar: builder.mutation<IAvatarResponse, FormData>({
      query: (formData) => ({
        url: "/me/avatar",
        method: "POST",
        body: formData,
        invalidatesTags: ["User"],
      }),
    }),
  }),
});

export const { 
  useGetMeQuery, 
  useGetUsersQuery, 
  useGetUserByIdQuery,
  useUploadAvatarMutation, // <-- добавили
} = userApi;





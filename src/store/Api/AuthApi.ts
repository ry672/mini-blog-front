// store/Api/AuthApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";

// --- Payloads
interface ILoginUserPayload {
  email: string;
  password: string;
}

interface IRegistrationUserPayload {
  name: string;
  surname: string;
  username: string;
  phone_number: string;
  email: string;
  password: string;
  city: string;
}

// --- Responses
interface IUser {
  id: number;
  name: string;
  surname: string;
  username: string;
  phone_number: string;
  email: string;
  refresh_token_hash?: string;
  city: string;
  profile_photo: string | null;
  createdAt?: string;
  updatedAt?: string;
  roles?: string[];
}

interface ILoginUserResponse {
  status: "success";
  user: IUser;
  access: string;
  refresh: string;
}

interface IRegistrationUserResponse {
  status: "success";
  user: IUser;
  access: string;
  refresh: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<ILoginUserResponse, ILoginUserPayload>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),

    registerUser: builder.mutation<IRegistrationUserResponse, IRegistrationUserPayload>({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),

    getUserById: builder.query<IUser, number>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserByIdQuery,
} = authApi;



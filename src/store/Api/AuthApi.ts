
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";
import { IUser } from "./UserApi";


export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface IRegistrationUserPayload {
  name: string;
  surname: string;
  username: string;
  phone_number: string;
  email: string;
  password: string;
  city: string;
}




export interface ILoginUserResponse {
  status: "success";
  user: IUser;
  access: string;
  refresh: string;
}

export interface IRegistrationUserResponse {
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

    
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  
} = authApi;



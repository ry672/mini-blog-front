
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";
import { RootState } from "../store";


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
  endpoints: (builder) => ({
    getMe: builder.query<IUser, void>({
      query: () => "/me",
    }),
  }),
});

export const { useGetMeQuery } = userApi;

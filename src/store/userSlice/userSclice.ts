// store/userSlice/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../Api/UserApi";

export interface UserState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        user: IUser;
        accessToken: string;
        refreshToken: string;
      }>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearUser(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    addUserID(state, action: PayloadAction<number | null>) {
      if (state.user) {
        state.user.id = action.payload ?? 0;
      } else if (action.payload !== null) {
        state.user = { id: action.payload } as IUser;
      }
    },
  },
});

export const { setUser, clearUser, addUserID } = userSlice.actions;
export default userSlice.reducer;


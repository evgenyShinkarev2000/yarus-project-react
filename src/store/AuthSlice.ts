import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "auth";

export const loginAsync = createAsyncThunk(
  name + "/login",
  async (loginParam: { login: string }, action) =>
  {
    let resolve: (v: any) => void;
    let reject: (v: any) => void;
    action.dispatch(login(loginParam));
    const promise = new Promise((res, rej) =>
    {
      resolve = res;
      reject = rej;
    });

    setTimeout(() => resolve("logined"), 1500);
    return promise;
  },
);

interface AuthState {
  currentUser: string,
  loginStatus: string,
}

const initialState = {
  currentUser: "",
  loginStatus: "nologin"
} as AuthState

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    login(state, action: PayloadAction<{login: string}>)
    {
      state.currentUser = action.payload.login;
    },
    logout(state, action: PayloadAction<undefined>)
    {
      state.currentUser = "";
    },
  },
  extraReducers: (builder) =>
  {
    builder.addCase(loginAsync.pending, (state, action) =>
    {
      state.loginStatus = "processing";
    });
    builder.addCase(loginAsync.fulfilled, (state, action) =>
    {
      state.loginStatus = "logined";
    });
    builder.addCase(loginAsync.rejected, (state, action) =>
    {
    });
  }
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UserCredential,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AppThunk } from "..";

const initialState: {
  errorMessage: string;
  account: null | UserCredential;
  loading: boolean;
  loginSuccess: boolean;
  loginFailure: boolean;
  credentialHasBeenFetched: boolean;
} = {
  errorMessage: "",
  account: null,
  loading: false,
  loginSuccess: false,
  loginFailure: false,
  credentialHasBeenFetched: false,
};

const auth = getAuth();

export const getCredential = (): AppThunk => async (dispatch, getState) => {
  dispatch(startFetchCredential(true));
  onAuthStateChanged(auth, (user) => {
    dispatch(completedFetchCredential(user));
  });
};

export const login = createAsyncThunk(
  "auth/log_in",
  async ({
    email,
    password,
  }: {
    // rememberMe: boolean;
    email: string;
    password: string;
  }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    startFetchCredential(state, action) {
      state.loading = true;
      state.credentialHasBeenFetched = false;
    },
    completedFetchCredential(state, action) {
      state.loading = false;
      state.account = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => ({
        ...initialState,
        loginFailure: true,
        errorMessage: action.error.message ?? "",
      }))
      .addCase(login.fulfilled, (state, action) => ({
        ...initialState,
        loading: false,
        loginSuccess: true,
      }));
  },
});

export const { reset, completedFetchCredential, startFetchCredential } =
  authSlice.actions;

export default authSlice.reducer;

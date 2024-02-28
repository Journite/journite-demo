import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  UserCredential,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  User,
} from "firebase/auth";
import { AppThunk } from "..";

const initialState: {
  errorMessage: string;
  account: null | User;
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
    rememberMe,
  }: {
    rememberMe: boolean;
    email: string;
    password: string;
  }) => {
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence,
    );
    return await signInWithEmailAndPassword(auth, email, password);
  },
);

export const logout = createAsyncThunk("auth/log_out", async () => {
  return await signOut(auth);
});

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
      state.credentialHasBeenFetched = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loginSuccess = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.loginSuccess = false;
        state.account = null;
      })
      .addMatcher(isPending(login, logout), (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected(login, logout), (_, action) => ({
        ...initialState,
        loginFailure: true,
        errorMessage: action.error.message ?? "",
      }));
  },
});

export const { reset, completedFetchCredential, startFetchCredential } =
  authSlice.actions;

export default authSlice.reducer;

import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const initialState: {
  loading: boolean;
  registrationSuccess: boolean;
  registrationFailure: boolean;
  errorMessage: null | string;
} = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null,
};

export const signUp = createAsyncThunk(
  "register/sign_up",
  async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    ).then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);

      // ...
    });
    return result;
  },
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.rejected, (state, action) => ({
        ...initialState,
        registrationFailure: true,
        errorMessage: action.error.message ?? "",
      }))
      .addCase(signUp.fulfilled, (state, action) => ({
        ...initialState,
        loading: false,
        registrationSuccess: true,
      }));
  },
});

export const { reset } = registerSlice.actions;

export default registerSlice.reducer;

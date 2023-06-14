//SignUpSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ firstName, lastName, email, password }, thunkAPI) => {
    try {
      let link = "http://localhost:5000/api/v1/users/register";
      const params = {
        email: email,
        firstName,
        lastName,
        password: password,
      };
      const response = await axios.post(link, params, {
        headers: { "Content-Type": "application/json" },
      });
      let data = await response.data;
      if (response.status === 201) {
        return data;
      } else {        
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const SignupSlice = createSlice({
  name: "signup",
  initialState: {
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, { payload }) => {        
        state.token = payload?.token;
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(signupUser.rejected, (state, { payload }) => {        
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload?.error || payload?.message || payload?.data?.message || payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState } = SignupSlice.actions;

export const signupSelector = (state) => state.signup;

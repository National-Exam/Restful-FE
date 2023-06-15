//LoginSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthorizationHeaders } from "../utils/authHeaders";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (thunkAPI) => {
    try {  
        const headers = createAuthorizationHeaders();
      let link = "http://localhost:5000/api/v1/owners";
      const response = await axios.get(link,{
        headers,
      });
      console.log(response, 'the BE RESPONSE')
      let data = await response.data;
      if (response.status === 200) {        
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (thunkAPI) => {
    try {  
        const headers = createAuthorizationHeaders();
      let link = "http://localhost:5000/api/v1/users/account";
      const response = await axios.get(link,{
        headers,
      });
      console.log(response, 'the BE RESPONSE')
      let data = await response.data;
      if (response.status === 200) {        
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/signupUser",
  async ({ firstName, lastName, phone, nationalId, address }, thunkAPI) => {
    try {
        const headers = createAuthorizationHeaders();
      let link = "http://localhost:5000/api/v1/owners";
      const params = {
        phone,
        firstName,
        lastName,
        nationalId,
        address
      };
      const response = await axios.post(link, params, {
        headers
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

export const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: {},
    isFetchingCurrentUser: false,
    getCurrentUserSuccess: false,
    getCurrentUserError:false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    isCreating: false,
    createdSuccess:false,
    createdMsg: "",
    createdError: false,
    createdErrorMessage: "",
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
        state.createdError = false;
        state.createdSuccess = false;
        state.isCreating = false;
          state.isFetchingCurrentUser= false;
    state.getCurrentUserSuccess= false;
    state.getCurrentUserError=false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage =
          payload?.error ||
          payload?.message ||
          payload?.data?.message ||
          payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.isFetching = true;
      });
    builder
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isFetchingCurrentUser = false;
        state.getCurrentUserSuccess = true;
        return state;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.isFetchingCurrentUser = false;
        state.getCurrentUserError = true;
        state.getCurrentUserSuccess = false;
        state.errorMessage =
          payload?.error ||
          payload?.message ||
          payload?.data?.message ||
          payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      });
    builder
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isCreating = false;        
        state.createdSuccess = true;
        state.createdError = false;
        state.createdMsg = payload?.message;
        return state;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.isCreating = false;
        state.createdError = true;
        state.createdSuccess = false;
        state.createdErrorMessage =
          payload?.error ||
          payload?.message ||
          payload?.data?.message ||
          payload;
          return state;
      })
      .addCase(createUser.pending, (state) => {
        state.isCreating = true;
        return state;
      });
  },
});

export const { clearState } = UserSlice.actions;

export const userSelector = (state) => state.users;

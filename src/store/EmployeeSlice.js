//LoginSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthorizationHeaders } from "../utils/authHeaders";

export const getEmployees = createAsyncThunk(
  "users/getEmployees",
  async ({page,limit},thunkAPI) => {
    try {
      const headers = createAuthorizationHeaders();
      let link = `http://localhost:5000/api/v1/employees?page=${page}&limit=${limit}`;
      const response = await axios.get(link, {
        headers,
      });
      console.log(response, "the BE RESPONSE");
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

export const createEmployee = createAsyncThunk(
  "users/createEmployee",
  async (
    {
      firstName,
      lastName,
      nationalId,
      telephone,
      email,
      department,
      position,
      laptopManufacturer,
      laptopModel,
      serialNumber,
    },
    thunkAPI
  ) => {
    try {
      const headers = createAuthorizationHeaders();
      let link = "http://localhost:5000/api/v1/employees";
      const params = {
        firstName,
        lastName,
        nationalId,
        telephone,
        email,
        department,
        position,
        laptopManufacturer,
        laptopModel,
        serialNumber,
      };
      const response = await axios.post(link, params, {
        headers,
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

export const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    isCreating: false,
    createdSuccess: false,
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
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.fulfilled, (state, { payload }) => {
        state.employees = payload;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(getEmployees.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage =
          payload?.error ||
          payload?.message ||
          payload?.data?.message ||
          payload;
      })
      .addCase(getEmployees.pending, (state) => {
        state.isFetching = true;
      });
    builder
      .addCase(createEmployee.fulfilled, (state, { payload }) => {
        state.isCreating = false;
        state.createdSuccess = true;
        state.createdError = false;
        state.createdMsg = payload?.message;
        return state;
      })
      .addCase(createEmployee.rejected, (state, { payload }) => {
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
      .addCase(createEmployee.pending, (state) => {
        state.isCreating = true;
        return state;
      });
  },
});

export const { clearState } = employeeSlice.actions;

export const employeeSelector = (state) => state.employees;

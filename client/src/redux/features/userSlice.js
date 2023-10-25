import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../services/authService";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  isLoading: false,
  message: "",
};

// Create New Product
export const getUsers = createAsyncThunk(
  "users/getAll",
  async (formData, thunkAPI) => {
    try {
      return await getAllUsers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const userSlice = createSlice({
  name: "diaspora",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = true;
        // state.isError = false;
        // console.log(action.payload);
        state.users.push(action.payload);
        toast.success("All users successfully");
      })
      .addCase(getUsers.rejected, (state, action) => {
        // state.isLoading = false;
        // state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
  },
});

export const selectIsLoading = (state) => state.product.isLoading;

export default userSlice.reducer;

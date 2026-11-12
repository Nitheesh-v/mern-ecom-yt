import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  Product_List: [],
};

//Add

export const addnewProd = createAsyncThunk(
  "/products/addnewprod",
  async (formData) => {
    const res = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  },
);

//fetch

export const Fetchprod = createAsyncThunk("/products/addnewprod", async () => {
  const res = await axios.get("http://localhost:5000/api/admin/products/get");

  return res.data;
});

//edit DATA

export const editprod = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const res = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res.data;
  },
);

//delete

export const deleteprod = createAsyncThunk(
  "/products/deleteproduct",
  async ({ id }) => {
    const res = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`,
    );
    return res.data;
  },
);

const AdminProd = createSlice({
  name: "adminProd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Fetchprod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Fetchprod.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.Product_List = action.payload.data;
      })
      .addCase(Fetchprod.rejected, (state, action) => {
        state.isLoading = false;
        state.Product_List = [];
      });
  },
});
export default AdminProd.reducer;

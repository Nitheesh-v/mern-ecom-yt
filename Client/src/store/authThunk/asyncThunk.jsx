import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: name,
          email,
          password,
        },
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData,
        { withCredentials: true }
      );

      if (!res.data.success) {
        return rejectWithValue(res.data.message);
      }
     console.log(res.data.user);
      return res.data.user; // goes to fulfilled
 
      
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);


export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/checkAuth",
        { withCredentials: true }
      );
         console.log("checkAuth response:", res.data);
      if (!res.data.success) {
        return rejectWithValue(res.data.message);
      }
      return res.data.user;
   
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Authentication check failed");
    }
  }
);

export const LogoutUser=createAsyncThunk(
  "/auth/logout", async()=>{
    const res=await axios.post( "http://localhost:5000/api/auth/logout",{},
      {
     withCredentials: true,
    })
    console.log(res,"logoutRes");
    return res.data
    
  })
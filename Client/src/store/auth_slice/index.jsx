import { createSlice} from "@reduxjs/toolkit";
import { checkAuth, loginUser, LogoutUser, registerUser, } from "../authThunk/asyncThunk";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // authStart: (state) => {
    //   state.isLoading = true;
    // },

    // authSuccess: (state, action) => {
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    //   console.log("action payload:", action.payload);

    //   state.isLoading = false;
    // },

    // authFail: (state) => {
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   state.isLoading = false;
    // },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
//Register
  extraReducers:(builder)=>{
    builder.addCase(registerUser.pending,(state)=>{
      state.isLoading=true
      state.error=null
    })
    .addCase(registerUser.fulfilled,(state,action)=>{
      state.isLoading=false
      state.isAuthenticated=true
      state.user=action.payload
    })
    .addCase(registerUser.rejected,(state,action)=>{
      state.isLoading = false;
      state.error = action.payload;
    })

//Login
    .addCase(loginUser.pending,(state)=>{
      state.isLoading=true
      state.error=null
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.isLoading=false
      state.isAuthenticated=true
      state.user=action.payload
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
           
//checkAuth
.addCase(checkAuth.pending,(state)=>{
  state.isLoading=true
 
})  
.addCase(checkAuth.fulfilled,(state,action)=>{
  state.isLoading=false
  state.isAuthenticated=true
  state.user=action.payload
})
.addCase(checkAuth.rejected,(state,action)=>{
  state.isLoading = false;
  state.error = action.payload;
  state.isAuthenticated = false;
})  


//logout
.addCase(LogoutUser.fulfilled,(state,action)=>{
  state.isLoading=false
  state.user=null
  state.isAuthenticated=false
})
  }


 
  
});

export const {logout } =
  authSlice.actions;

export default authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_slice";
import adminProd from "./Admin/Products_Slice/index"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProd,
  },

});

export default store;

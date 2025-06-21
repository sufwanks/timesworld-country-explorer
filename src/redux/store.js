import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import countryReducer from "./countriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countryReducer,
  },
});

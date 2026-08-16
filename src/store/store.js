import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import movieReducer from "../store/movieSlice";

const store = configureStore({
  reducer: { user: userReducer, movie: movieReducer },
});

export default store;

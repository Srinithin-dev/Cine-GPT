import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import movieReducer from "../store/movieSlice";
import gptReducer from "../store/gptSearchSlice";
import multiLanguageReducer from "./multi-LanguageSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    gpt: gptReducer,
    lang: multiLanguageReducer,
  },
});

export default store;

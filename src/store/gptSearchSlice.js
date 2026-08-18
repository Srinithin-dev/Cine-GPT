import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const gptSearchSlice = createSlice({
  name: "gptSearch",
  initialState,
  reducers: {
    getMovies: (state, action) => {},
  },
});
export const { getMovies } = gptSearchSlice.actions;
export default gptSearchSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addGptMovieResult: {
    movieResults: null,
    movieName: null,
  },
};
const gptSearchSlice = createSlice({
  name: "gptSearch",
  initialState,
  reducers: {
    getMovies: (state, action) => {
      const { movieResults, movieName } = action.payload;
      state.addGptMovieResult.movieName = movieName;
      state.addGptMovieResult.movieResults = movieResults;
    },
  },
});
export const { getMovies } = gptSearchSlice.actions;
export default gptSearchSlice.reducer;

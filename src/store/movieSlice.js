import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlayingMovies: {},
  searchResults: {},
  trailerVideo: null,
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMoviesList: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    searchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});
export const { addMoviesList, addTrailerVideo, searchResults } =
  movieSlice.actions;
export default movieSlice.reducer;

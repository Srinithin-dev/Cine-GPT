import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlayingMovies: {},
  searchResults: {},
  trailerVideo: null,
  MovieDetails: {},
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
    MovieDetails: (state, action) => {
      state.MovieDetails = action.payload;
    },
  },
});
export const { addMoviesList, addTrailerVideo, searchResults, MovieDetails } =
  movieSlice.actions;
export default movieSlice.reducer;

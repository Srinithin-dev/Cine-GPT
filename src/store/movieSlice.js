import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlayingMovies: {},
  trailerVideo: null,
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMoviesList: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});
export const { addMoviesList, addTrailerVideo } = movieSlice.actions;
export default movieSlice.reducer;

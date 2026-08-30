import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    movies: [],
  },
  reducers: {
    addUser: (state, action) => {
      return { ...action.payload, movies: [] };
    },
    updateUser: (state, action) => {
      return { ...action.payload, movies: [] };
    },
    removeUser: (state, action) => {
      return null;
    },
    setMovieList: (state, action) => {
      state.movies = action.payload;
    },
    addMovieToList: (state, action) => {
      state?.movies.push(action.payload);
    },
  },
});

export const { addUser, updateUser, addMovieToList, removeUser, setMovieList } =
  userSlice.actions;
export default userSlice.reducer;

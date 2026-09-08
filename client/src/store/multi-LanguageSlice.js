import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  default: "en",
};
const multiLanguageSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.default = action.payload;
    },
  },
});

export const { changeLanguage } = multiLanguageSlice.actions;

export default multiLanguageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    "Twitter",
    "LinkedIn",
    "Instagram",
  ],
};

const platformSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {},
});

export default platformSlice.reducer;
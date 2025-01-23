import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    name: "Bode Thomas",
  },

  {
    id: 1,
    name: "Adre Cole",
  },

  {
    id: 2,
    name: "Sana Nathan",
  },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    addUser(state, action) {
      console.log("in user slice", action.payload);
      state.user = action.payload;
    },
    removeUser(state, action) {
      state.user = null;
    },
  },
});
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

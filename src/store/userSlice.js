import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  //   initialState: localStorage.getItem("getAuth")
  //     ? JSON.parse(localStorage.getItem("getAuth"))
  //     : [],
  initialState: { user: null },
  reducers: {
    addUser(state, action) {
      //   localStorage.setItem("getAuth", JSON.stringify([action.payload]));
      console.log("in user slice", action.payload);
      state.user = action.payload;
    },
    removeUser(state, action) {
      //   localStorage.removeItem("getAuth");
      state.user = null;
    },
  },
});
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

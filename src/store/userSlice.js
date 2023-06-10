import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  //   initialState: localStorage.getItem("getAuth")
  //     ? JSON.parse(localStorage.getItem("getAuth"))
  //     : [],
  initialState: [],
  reducers: {
    addUser(state, action) {
      //   localStorage.setItem("getAuth", JSON.stringify([action.payload]));
      return (state = action.payload);
    },
    removeUser(state, action) {
      //   localStorage.removeItem("getAuth");
      return (state = action.payload);
    },
  },
});
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

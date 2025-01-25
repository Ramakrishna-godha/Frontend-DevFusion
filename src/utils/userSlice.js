import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  reducers: {
    addUser: (state, action) => {
      // return action.payload;
      // console.log("Payload received in Redux:", action.payload);
      state.user = action.payload;
    },
    removeUser: () => {
      return { user: null };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

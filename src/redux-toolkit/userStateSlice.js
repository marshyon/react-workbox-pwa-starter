import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        "userstate": null
}

export const userStateSlice = createSlice({
  name: "userStateReporter",
  initialState,
  reducers: {
    storeUserState: (state, action) => {
      state.results = action.payload;
    }
  }
});

export const { storeUserState } = userStateSlice.actions

export default userStateSlice.reducer;
// selectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const selectionSlice = createSlice({
  name: "selection",
  initialState: {
    type: null,
    id: null,
    pinned: false
  },
  reducers: {
    setSelected(state, action) {
      state.type = action.payload.type;
      state.id = action.payload.id;
      state.pinned = action.payload.pinned ?? false;
    },
    clearSelected(state) {
      state.type = null;
      state.id = null;
      state.pinned = false;
    }
  }
});

export const { setSelected, clearSelected } = selectionSlice.actions;
export default selectionSlice.reducer;
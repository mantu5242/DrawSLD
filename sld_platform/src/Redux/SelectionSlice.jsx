// selectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const selectionSlice = createSlice({
  name: "selection",
  initialState: {
    type: null,
    id: null
  },
  reducers: {
    setSelected(state, action) {
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    clearSelected(state) {
      state.type = null;
      state.id = null;
    }
  }
});

export const { setSelected, clearSelected } = selectionSlice.actions;
export default selectionSlice.reducer;
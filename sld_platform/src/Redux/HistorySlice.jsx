import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  past: [],
  present: {
    nodes: [],
    arrows: [],
  },
  future: []
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    pushToHistory(state, action) {
      state.past.push(state.present);
      state.present = action.payload;
      state.future = [];
    },

    undo(state) {
      if (!state.past.length) return;

      const previous = state.past.pop();
      state.future.unshift(state.present);
      state.present = previous;
    },

    redo(state) {
      if (!state.future.length) return;

      const next = state.future.shift();
      state.past.push(state.present);
      state.present = next;
    },

    resetHistory(state, action) {
      state.past = [];
      state.future = [];
      state.present = action.payload;
    }
  }
});

export const { pushToHistory, undo, redo, resetHistory } =
  historySlice.actions;

export default historySlice.reducer;
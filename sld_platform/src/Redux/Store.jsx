import { configureStore } from "@reduxjs/toolkit";
import diagramReducer from "./DiagramSlice";
import uiReducer from "./UiSlice";
import selectionReducer from "./SelectionSlice";
import undoable from 'redux-undo'

export const store = configureStore({
  reducer: {
    // diagram: diagramReducer,
    history: undoable(diagramReducer),
    ui: uiReducer,
    selection: selectionReducer
  },
  devTools: true,
});
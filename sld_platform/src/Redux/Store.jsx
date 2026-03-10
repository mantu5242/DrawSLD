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

store.subscribe(() => {
  try {
    const state = store.getState();

    const nodes = state.history.present.nodes;
    const arrows = state.history.present.arrows;

    if (nodes.length === 0 && arrows.length === 0) return;

    const diagramState = {
      nodes,
      arrows
    };

    localStorage.setItem(
      "sld-project",
      JSON.stringify(diagramState)
    );

  } catch (err) {
    console.error("Auto save error", err);
  }
});
import { configureStore } from "@reduxjs/toolkit";
import diagramReducer from './DiagramSlice';
import uiReducer from "./UiSlice";

export const store = configureStore({
  reducer: {
    diagram: diagramReducer,
    ui: uiReducer
  }
});
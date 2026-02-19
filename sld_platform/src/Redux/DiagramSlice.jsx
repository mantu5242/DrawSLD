import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: 'edit',
    history:{
        past: [],
        present: {
            nodes:[],
            arrows: [],
        },
        future: []
    }
};

const diagramSlice = createSlice({
    name: "diagram",
    initialState,
    reducers : {
        setMode(state, action){
            state.mode = action.payload;
        },
        undo(state){
            if(!state.history.past.length) return;
            const prev = state.history.past.pop();
            state.history.future.unshift(state.history.present);
            state.history.present = prev;
        },
        redo(state){
            if(!state.history.future.length) return;
            const next = state.history.future.pop();
            state.history.past.push(state.history.present);
            state.history.present = next;
        }
    }
})

export const { setMode, undo, redo } = diagramSlice.actions;
export default diagramSlice.reducer;
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getSnapPoint } from '../Component/Utils/RectSnap'
import { getCircleSnapPoint } from '../Component/Utils/CircleSnap'

const initialState = {
  nodes: [],
  arrows: [],
};

 const Node_def = {
    PRS: { width: 80, height: 50 },
    QPS: { width: 100, height: 50 },
    ESDV: { width: 60, height: 30 },
    CONSUMER: { width: 50, height: 40 },
    REGULATOR: { width: 60, height: 30 },
    STREETREGULATOR: { width: 60, height: 30 },
    REDUCER: { width: 60, height: 30 },
    METER: { width: 60, height: 30 },
    GB: { width: 60, height: 30 },
    BRANCH: { width: 30, height: 30 },
    VALVE: { width: 60, height: 30 },
    SENSOR: { width: 50, height: 30 },
    JOINT: { width: 30, height: 30 }
  };


const diagramSlice = createSlice({
  name: "diagram",
  initialState,
  reducers: {

    /* =========================
       DIAGRAM LOAD / RESET
    ========================== */

    setDiagram(state, action) {
      state.nodes = action.payload.nodes || [];
      state.arrows = action.payload.arrows || [];
    },

    /* =========================
       NODE ACTIONS
    ========================== */

    addNode(state, action) {
      // console.log(action.payload)
      const { type, x = 200, y = 100} = action.payload;
      const config = Node_def[type];
      state.nodes.push({
        id: `n-${nanoid()}`,
        type,
        x,
        y,
        ...config 
      });
      // console.log(state.config)

    },

    updateNode(state, action) {
      const { id, x, y } = action.payload;
      const node = state.nodes.find(n => n.id === id);
      if (!node) return;
      node.x = x;
      node.y = y;

      // sync arrows 
      state.arrows.forEach(arrow => {
        const updatePort = (port) => {
          if(!port.attachedTo) return port;
          if(port.attachedTo.nodeId !== node.id) return port;

          const { side , index} = port.attachedTo;
          if( node.radius ){
            const snap = getCircleSnapPoint(node, port.x, port.y);
            return {...snap, attachedTo: port.attachedTo}
          }

          const snap = getSnapPoint(node, side ,index);
          return { ...snap, attachedTo: port.attachedTo};
        }

        arrow.start = updatePort(arrow.start);
        arrow.end = updatePort(arrow.end);
      })
    },

    resizeNode(state, action) {
      const { id, x, y, width, height, radius } = action.payload;
      const node = state.nodes.find(n => n.id === id);
      if (!node) return;

      node.x = x;
      node.y = y;
      node.width = width;
      node.height = height;
      node.radius = radius;
    },

    removeNode(state, action) {
      const nodeId = action.payload;

      state.nodes = state.nodes.filter(n => n.id !== nodeId);

      // also remove connected arrows
      state.arrows = state.arrows.filter(
        a =>
          a.start.attachedTo?.nodeId !== nodeId &&
          a.end.attachedTo?.nodeId !== nodeId
      );
    },

    /* =========================
       ARROW ACTIONS
    ========================== */

    addArrow(state) {
      state.arrows.push({
        id: `a-${nanoid()}`,
        start: { x: 240, y: 41, attachedTo: null },
        end: { x: 390, y: 41, attachedTo: null },
        stroke: "#000000",
        label: {
          text: "",
          t: 0.5,
          offset: { x: 0, y: 0 },
          visible: false,
          editing: false
        }
      });
    },

    addArrowFromPorts(state, action) {
      const { start, end } = action.payload;

      state.arrows.push({
        id: `a-${nanoid()}`,
        start,
        end,
        stroke: "#000000",
        label: {
          text: "",
          t: 0.5,
          offset: { x: 0, y: 0 },
          visible: false,
          editing: false
        }
      });
    },

    updateArrowPort(state, action) {
      const { arrowId, port, data } = action.payload;

      const arrow = state.arrows.find(a => a.id === arrowId);
      if (!arrow) return;

      arrow[port] = data; // data = { x, y, attachedTo }
    },

    updateArrowLabel(state, action) {
      const { arrowId, text } = action.payload;

      const arrow = state.arrows.find(a => a.id === arrowId);
      if (!arrow) return;

      arrow.label.text = text;
    },

    updateArrowColor(state, action) {
      const { arrowId, color } = action.payload;

      const arrow = state.arrows.find(a => a.id === arrowId);
      if (!arrow) return;

      arrow.stroke = color;
    },

    removeArrow(state, action) {
      const arrowId = action.payload;
      state.arrows = state.arrows.filter(a => a.id !== arrowId);
    },

    syncArrowsWithNode(state, action) {
    const node = action.payload;

    state.arrows.forEach(arrow => {
        const updatePort = (port) => {
        if (!port.attachedTo) return port;
        if (port.attachedTo.nodeId !== node.id) return port;

        const { side, index } = port.attachedTo;

        // Circle node
        if (node.radius) {
            const snap = getCircleSnapPoint(
            node,
            port.x,
            port.y
            );

            return {
            ...snap,
            attachedTo: port.attachedTo
            };
        }

        // Rectangle / others
        const snap = getSnapPoint(node, side, index);

        return {
            ...snap,
            attachedTo: port.attachedTo
        };
        };

        arrow.start = updatePort(arrow.start);
        arrow.end = updatePort(arrow.end);
    });
    },

    cleanupNodeArrows(state, action) {
        const nodeId = action.payload;
        state.arrows = state.arrows.filter(
            a =>
            a.start.attachedTo?.nodeId !== nodeId &&
            a.end.attachedTo?.nodeId !== nodeId
        );
    },
    setArrowLabelVisible(state, action) {
    const { arrowId, visible } = action.payload;
    const arrow = state.arrows.find(a => a.id === arrowId);
    if (arrow) arrow.label.visible = visible;
    },

    updateArrowLabelOffset(state, action) {
    const { arrowId, offset } = action.payload;
    const arrow = state.arrows.find(a => a.id === arrowId);
    if (arrow) arrow.label.offset = offset;
    },  

    /* =========================
       BULK SETTERS
    ========================== */

    setNodes(state, action) {
      state.nodes = action.payload;
    },

    setArrows(state, action) {
      state.arrows = action.payload;
    },

   
  }
});

export const {
  setDiagram,

  addNode,
  updateNode,
  resizeNode,
  removeNode,

  addArrow,
  addArrowFromPorts,
  updateArrowPort,
  updateArrowLabel,
  updateArrowColor,
  removeArrow,
  syncArrowsWithNode,
  cleanupNodeArrows,
  setArrowLabelVisible,
  updateArrowLabelOffset,

  setNodes,
  setArrows

} = diagramSlice.actions;

export default diagramSlice.reducer;
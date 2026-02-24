// import { useEffect, useState, useRef } from "react";

// // let nodeCount = 0;

// export const UseNodes = () => {
//   const [nodes, setNodes] = useState(() => {
//     const saved = localStorage.getItem("sld-project");
//     return saved ? JSON.parse(saved).nodes || [] : [];
//   });

//  const nodeCountRef = useRef(
//     nodes.length > 0
//       ? Math.max(...nodes.map(n => parseInt(n.id.slice(1)))) + 1
//       : 0
//   );
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("sld-project") || "{}");
//     localStorage.setItem(
//       "sld-project",
//       JSON.stringify({ ...saved, nodes })
//     );
//   }, [nodes]);

//   const Node_def = {  
//     PRS : {width:80, height: 50},
//     QPS : {width: 100, height: 50},
//     ESDV : {width: 60, height: 30},
//     CONSUMER: {width: 50, height: 40},
//     REGULATOR: {width:60, height: 30},
//     STREETREGULATOR: {width:60, height: 30},
//     REDUCER: {width:60, height: 30},
//     METER: {width:60, height: 30},
//     GB: {width:60, height: 30},
//     REGULATOR: {width:60, height: 30},  
//     BRANCH: {width: 30, height:30},
//     VALVE: {width:60, height: 30},
//     SENSOR: {width:50, height: 30},
//     JOINT: {width: 30, height:30}
//   }

//   const addNode = (type) => {
//     console.log("nodes come")
//     console.log("type", type);
//     const def = Node_def[type];
//     console.log(def)
//     setNodes(prev => [
//       ...prev,
//       {
//         id: `n${nodeCountRef.current++}`,
//         type,
//         x: 200,
//         y: 100,
//         ...def
//       }
//     ]);
//   };

//   const updateNode = (id, x, y) => {
//     setNodes(prev =>
//       prev.map(n => n.id === id ? { ...n, x, y } : n)
//     );
//     // console.log("position of the node",x, y)

//   };

//   const resizeNode = (id, x, y, width, height, radius) => {
//     setNodes(prev =>
//       prev.map(n =>
//         n.id === id ? { ...n, x, y, width, height, radius } : n
//       )
//     );
//   };

//   const removeNode = (id) => {
//     setNodes(prev => prev.filter(n => n.id !== id));
//   };

//   return { nodes,setNodes, addNode, updateNode, resizeNode, removeNode, setNodes };
// };


import { useDispatch, useSelector } from "react-redux";
import {
  addNode,
  updateNodePosition,
  resizeNode,
  removeNode
} from "../../store/diagramSlice";

export const useNodes = () => {
  const dispatch = useDispatch();

  const nodes = useSelector(state => state.diagram.nodes);

  /* =========================
     NODE DEFAULT CONFIG
  ========================== */

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

  /* =========================
     ADD NODE
  ========================== */

  const handleAddNode = (type) => {
    const config = Node_def[type];
    if (!config) return;

    dispatch(
      addNode({
        type,
        x: 200,
        y: 100,
        config
      })
    );
  };

  /* =========================
     MOVE NODE
  ========================== */

  const handleUpdateNode = (id, x, y) => {
    dispatch(updateNodePosition({ id, x, y }));
  };

  /* =========================
     RESIZE NODE
  ========================== */

  const handleResizeNode = (id, x, y, width, height, radius) => {
    dispatch(
      resizeNode({
        id,
        x,
        y,
        width,
        height,
        radius
      })
    );
  };

  /* =========================
     REMOVE NODE
  ========================== */

  const handleRemoveNode = (id) => {
    dispatch(removeNode(id));
  };

  return {
    nodes,
    addNode: handleAddNode,
    updateNode: handleUpdateNode,
    resizeNode: handleResizeNode,
    removeNode: handleRemoveNode
  };
};
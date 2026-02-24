// import { useEffect, useRef, useState } from "react";
// import { hitTestNode, getNodeBound, getNodeCenter } from "../../Component/Utils/Geometry";
// import { getCircleSnapPoint } from "../Utils/CircleSnap";
// import { getSnapPoint } from "../Utils/RectSnap";

// // let arrowCount = 0;
// const SIDE_OFFSET = 0;

// export const useArrow = (nodes) => {
//   const [arrows, setArrows] = useState(() => {
//     const saved = localStorage.getItem("sld-project");
//     return saved ? JSON.parse(saved).arrows || [] : [];
//   });
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("sld-project") || "{}");
//     localStorage.setItem(
//       "sld-project",
//       JSON.stringify({ ...saved, arrows })
//     );
//   }, [arrows]);

//   /* ---------------- ADD ARROW ---------------- */
//   const arrowCountRef = useRef(
//     arrows.length > 0
//       ? Math.max(...arrows.map(a => parseInt(a.id.slice(1)))) + 1
//       : 0
//   );



//   const addArrow = () => {
//     setArrows(prev => [
//       ...prev,
//       {
//         id: `a${arrowCountRef.current++}`,
//         start: { x: 240, y: 41, attachedTo: null },
//         end: { x: 390, y: 41, attachedTo: null },
//         stroke: "#000000",
//         label: {
//           text: "",
//           t: 0.5,       //Relative mid position on the arrow
//           offset: { x: 0, y: 0 },  // relative draggable position from the arrow
//           visible: false,  // text is visible or not
//           editing: false
//         }
//       }
//     ]);
//   };


//   // to create arrow from port
//   const addArrowFromPorts = (from, to) => {
//     console.log("from", from);
//     console.log("to ", to);
//     const fromNode = nodes.find(n => n.id === from.nodeId);
//     const toNode = nodes.find(n => n.id === to.nodeId);
//     console.log("from Node - ", fromNode);
//     console.log("to Node - ", toNode);

//     if (!fromNode || !toNode) return;
//     const fromIndex = from.index ?? 0;
//     const toIndex = to.index ?? 0;

//     let startSnap;
//     if (fromNode.radius) {
//       startSnap = getCircleSnapPoint(fromNode, fromNode.x, fromNode.y);
//     }
//     else {
//       startSnap = getSnapPoint(fromNode, from.side, fromIndex);
//       console.log('start snap', startSnap);
//     }

//     let endSnap;
//     if (toNode.radius) {
//       endSnap = getCircleSnapPoint(toNode, toNode.x, toNode.y);
//     }
//     else {
//       endSnap = getSnapPoint(toNode, to.side, toIndex);
//       console.log('end snap', endSnap);
//     }
//     setArrows(prev => [
//       ...prev, {
//         id: `a${arrowCountRef.current++}`,
//         start: {
//           ...startSnap,
//           attachedTo: {
//             nodeId: from.nodeId,
//             side: from.side,
//             index: fromIndex
//           }
//         },
//         end: {
//           ...endSnap,
//           attachedTo: {
//             nodeId: to.nodeId,
//             side: to.side,
//             index: toIndex
//           }
//         },
//         stroke: "#000",
//         label: {
//           text: "",
//           t: 0.5,
//           offset: { x: 0, y: 0 },
//           visible: false,
//           editing: false
//         }
//       }
//     ])

//   }

//   // update the label of the arrow
//   const updateArrowLabel = (arrowId, text) => {
//     setArrows(prev => prev.map(arrows => arrows.id === arrowId ?
//       {
//         ...arrows,
//         label: {
//           ...arrows.label, text
//         }
//       }
//       : arrows
//     ))
//   }

//   /* ---------------- UPDATE ARROW COLOR ----------- */
//   const updateArrowColor = (arrowId, color) => {
//     setArrows(prev =>
//       prev.map(a =>
//         a.id === arrowId
//           ? { ...a, stroke: color }
//           : a
//       )
//     );
//   };


//   /* ---------------- PORT DRAG ---------------- */
//   const updateArrowPort = (arrowId, port, x, y) => {
//     console.log("mouse pointer - ",x,y);
//     const node = hitTestNode(nodes, x, y);
//     setArrows(prev =>
//       prev.map(a => {
//         if (a.id !== arrowId) return a;
//         if (!node) {
//           return {
//             ...a,
//             [port]: { x, y, attachedTo: null }
//           };
//         }

//         // Prevent arrow from connecting to itselft - loop
//         const otherPort = port === "start" ? "end" : "start";
//         if (a[otherPort]?.attachedTo?.nodeId === node.id) {
//           return a;
//         }

//         // if node is circle ............

//         if (node.radius) {
//           const dx = x - node.x;
//           const dy = y - node.y;
//           const side = Math.abs(dx) > Math.abs(dy) 
//             ? (dx > 0 ? "right" : "left") 
//             : (dy > 0 ? "bottom" : "top");

//           // 2. Calculate how many arrows are already on THIS side of THIS node
//           const index = prev.filter(ar =>
//             ar[port]?.attachedTo?.nodeId === node.id &&
//             ar[port]?.attachedTo?.side === side &&
//             ar.id !== arrowId
//           ).length;
//           const snap = getCircleSnapPoint(node, x, y, index);
//           return {
//             ...a,
//             [port]: {
//               ...snap, attachedTo: {
//                 nodeId: node.id,
//               }
//             }
//           }
//         }

//         // if node is rectangular ..............
//         const { x: cx, y: cy } = getNodeCenter(node);
//         const dx = x - cx;
//         const dy = y - cy;

//         let side;
//         if (Math.abs(dx) > Math.abs(dy)) {
//           side = dx > 0 ? "right" : "left";
//         } else {
//           side = dy > 0 ? "bottom" : "top";
//         }
//         // how many port are connected to node
//         const index = prev.filter(ar =>
//           ar[port]?.attachedTo?.nodeId === node.id &&
//           ar[port]?.attachedTo?.side === side &&
//           ar.id !== arrowId
//         ).length;


//         const snap = getSnapPoint(node, side, index);

//         return {
//           ...a,
//           [port]: {
//             ...snap,
//             attachedTo: {
//               nodeId: node.id,
//               side,
//               index
//             }
//           }
//         };


//       })
//     );
//   };


//   const syncArrowsWithNode = (node) => {
//     setArrows(prev =>
//       prev.map(a => {

//         const updatePort = (port) => {
//           if (!port.attachedTo) return port;
//           if (port.attachedTo.nodeId !== node.id) return port;

//           const { side, index } = port.attachedTo;

//           // Circle node
//           if (node.radius) {
//             const snap = getCircleSnapPoint(
//               node,
//               port.x,
//               port.y
//             );
//             return {
//               ...snap,
//               attachedTo: port.attachedTo
//             };
//           }

//           // Rectangle / Branch / PRS / etc
//           const snap = getSnapPoint(node, side, index);

//           return {
//             ...snap,
//             attachedTo: port.attachedTo
//           };
//         };

//         return {
//           ...a,
//           start: updatePort(a.start),
//           end: updatePort(a.end)
//         };
//       })
//     );
//   };


//   /* ---------------- DELETE ---------------- */

//   const removeArrow = (arrowId) => {
//     setArrows(prev => prev.filter(a => a.id !== arrowId));
//   };

//   const cleanupNodeArrows = (nodeId) => {
//     setArrows(prev =>
//       prev.filter(
//         a =>
//           a.start.attachedTo?.nodeId !== nodeId &&
//           a.end.attachedTo?.nodeId !== nodeId
//       )
//     );
//   };

//   return {
//     arrows,
//     setArrows,
//     addArrow,
//     addArrowFromPorts,
//     updateArrowPort,
//     updateArrowLabel,
//     syncArrowsWithNode,
//     removeArrow,
//     updateArrowColor,
//     cleanupNodeArrows,
//     setArrows
//   };
// };



import { useDispatch, useSelector } from "react-redux";
import {
  addArrow,
  addArrowFromPorts,
  updateArrowPort,
  updateArrowLabel,
  updateArrowColor,
  removeArrow
} from "../../Redux/DiagramSlice";

import { hitTestNode, getNodeCenter } from "../../Component/Utils/Geometry";
import { getCircleSnapPoint } from "../Utils/CircleSnap";
import { getSnapPoint } from "../Utils/RectSnap";

export const useArrow = () => {
  const dispatch = useDispatch();

  const arrows = useSelector(state => state.history.present.arrows);
  const nodes = useSelector(state => state.history.present.nodes);

  /* =============================
     ADD BASIC ARROW
  ============================== */
  const handleAddArrow = () => {
    dispatch(addArrow());
  };

  /* =============================
     ADD ARROW FROM PORTS
  ============================== */
  const handleAddArrowFromPorts = (from, to) => {
    const fromNode = nodes.find(n => n.id === from.nodeId);
    // console.log("fromNode ",fromNode)
    const toNode = nodes.find(n => n.id === to.nodeId);
    // console.log("toNode", toNode);

    if (!fromNode || !toNode) return;

    const fromIndex = from.index ?? 0;
    const toIndex = to.index ?? 0;

    const startSnap = fromNode.radius
      ? getCircleSnapPoint(fromNode, fromNode.x, fromNode.y)
      : getSnapPoint(fromNode, from.side, fromIndex);

    const endSnap = toNode.radius
      ? getCircleSnapPoint(toNode, toNode.x, toNode.y)
      : getSnapPoint(toNode, to.side, toIndex);

    dispatch(
      addArrowFromPorts({
        start: {
          ...startSnap,
          attachedTo: {
            nodeId: from.nodeId,
            side: from.side,
            index: fromIndex
          }
        },
        end: {
          ...endSnap,
          attachedTo: {
            nodeId: to.nodeId,
            side: to.side,
            index: toIndex
          }
        }
      })
    );
  };

  /* =============================
     UPDATE ARROW LABEL
  ============================== */
  const handleUpdateArrowLabel = (arrowId, text) => {
    dispatch(updateArrowLabel({ arrowId, text }));
  };

  /* =============================
     UPDATE ARROW COLOR
  ============================== */
  const handleUpdateArrowColor = (arrowId, color) => {
    dispatch(updateArrowColor({ arrowId, color }));
  };

  /* =============================
     PORT DRAGGING
  ============================== */
  const handleUpdateArrowPort = (arrowId, port, x, y) => {
    const node = hitTestNode(nodes, x, y);

    if (!node) {
      dispatch(
        updateArrowPort({
          arrowId,
          port,
          data: { x, y, attachedTo: null }
        })
      );
      return;
    }

    const arrow = arrows.find(a => a.id === arrowId);
    if (!arrow) return;

    const otherPort = port === "start" ? "end" : "start";

    // Prevent self loop
    if (arrow[otherPort]?.attachedTo?.nodeId === node.id) return;

    /* -------- CIRCLE NODE -------- */
    if (node.radius) {
      const snap = getCircleSnapPoint(node, x, y);

      dispatch(
        updateArrowPort({
          arrowId,
          port,
          data: {
            ...snap,
            attachedTo: {
              nodeId: node.id
            }
          }
        })
      );
      return;
    }

    /* -------- RECT NODE -------- */
    const { x: cx, y: cy } = getNodeCenter(node);
    const dx = x - cx;
    const dy = y - cy;

    const side =
      Math.abs(dx) > Math.abs(dy)
        ? dx > 0
          ? "right"
          : "left"
        : dy > 0
        ? "bottom"
        : "top";

    const snap = getSnapPoint(node, side, 0);

    dispatch(
      updateArrowPort({
        arrowId,
        port,
        data: {
          ...snap,
          attachedTo: {
            nodeId: node.id,
            side,
            index: 0
          }
        }
      })
    );
  };

  /* =============================
     DELETE
  ============================== */
  const handleRemoveArrow = arrowId => {
    dispatch(removeArrow(arrowId));
  };

  return {
    arrows,
    addArrow: handleAddArrow,
    addArrowFromPorts: handleAddArrowFromPorts,
    updateArrowPort: handleUpdateArrowPort,
    updateArrowLabel: handleUpdateArrowLabel,
    updateArrowColor: handleUpdateArrowColor,
    removeArrow: handleRemoveArrow
  };
};
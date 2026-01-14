import { useState } from "react";
import { hitTestNode, getNearestBoundaryPoint } from "../../Component/Utils/Geometry";

let arrowCount = 0;
const SIDE_OFFSET = 14;

export const useArrow = (nodes) => {
  const [arrows, setArrows] = useState([]);

  /* ---------------- ADD ARROW ---------------- */

  const addArrow = () => {
    setArrows(prev => [
      ...prev,
      {
        id: `a${arrowCount++}`,
        start: { x: 240, y: 41, attachedTo: null },
        end: { x: 390, y: 41, attachedTo: null },
        stroke: "#000000",
        label: {
          text: "",
          t: 0.5,       //Relative mid position on the arrow
          offset: {x: 0, y: 0},  // relative draggable position from the arrow
          visible: false,  // text is visible or not
          editing: false
        }
      }
    ]);
  };


// update the label of the arrow
  const updateArrowLabel = (arrowId, text) => {
    setArrows(prev => prev.map(arrows => arrows.id === arrowId ?
    {
      ...arrows, 
      label: {
        ...arrows.label, text
      }
    }
    : arrows
    ))
  }

  /* ---------------- UPDATE ARROW COLOR ----------- */
  const updateArrowColor = (arrowId, color) => {
    setArrows(prev =>
      prev.map(a =>
        a.id === arrowId
          ? { ...a, stroke: color }
          : a
      )
    );
  };



  // Helper functions
  const getNodeCenter = (node) => {
    if(node.radius){
      return {x: node.x, y: node.y}
    }

    return {
      x: node.x + node.width/2,
      y: node.y + node.height/2
    }
  }

  const getNodeBound = (node) => {
    if(node.radius){
      const r = node.radius
      return {
        left: node.x - r,
        right: node.x + r,
        top: node.y - r,
        bottom: node.y + r,
        width: r * 2, 
        height: r * 2
      }
    }

    return {
      left: node.x,
      right: node.x + node.width,
      top: node.y,
      bottom: node.y + node.height,
      width: node.width,
      height: node.height,
    }
  }



  // ------------- Snapping Logic ---------------

    // For Rectangles ...

  const getSnapPoint = (node, side, index) => {
    const padding = 20;
    const spacing = SIDE_OFFSET;
    console.log(node)
    const bounds = getNodeBound(node);

    switch (side) {
      case "left":
        return {
          x: bounds.left,
          y: bounds.top + padding + index * spacing,
        };

      case "right":
        return {
          x: bounds.right,
          y: bounds.top + padding + index * spacing,
        };

      case "top":
        return {
          x: bounds.left + padding + index * spacing,
          y: bounds.top,
        };

      case "bottom":
        return {
          x: bounds.left + padding + index * spacing,
          y: bounds.bottom,
        };

      default:
        return getNodeCenter(node);
    }
  };

// For Circle..............

//   const getCircleSnapPoint = (node, x, y) => {
//     const cx = node.x;
//     const cy = node.y;
//     const r = node.radius;

//     const dx = x - cx;
//     const dy = y - cy;

//     // Compute angle from center to pointer in degrees
//     const angle = Math.atan2(dy, dx) * (180 / Math.PI); // -180 to 180

//     if (angle >= -45 && angle <= 45) {
//       console.log("right")
//       return { x: cx + r, y: cy, side: "right" };
//     } 
//     else if (angle > 45 && angle < 135) {
//       console.log('bottom')
//       return { x: cx, y: cy + r, side: "bottom" };
//     } 
//     else if (angle < -45 && angle >= -135) {
//       console.log("top")
//       return { x: cx, y: cy - r, side: "top" };
//     } 
//     else {
//       console.log("left")
//       return { x: cx, y: cy - r, side: "left" };
//     }
// };


const getCircleSnapPoint = (node, x, y, index = 0, spacing = 14) => {
  const cx = node.x;
  const cy = node.y;
  const r = node.radius;

  const dx = x - cx;
  const dy = y - cy;

  let side;
  if (Math.abs(dx) > Math.abs(dy)) {
    side = dx > 0 ? "right" : "left";
  } else {
    side = dy > 0 ? "bottom" : "top";
  }

  // Base snap coordinates
  let snapX, snapY;

  switch (side) {
    case "right":
      snapX = cx + r;
      snapY = cy + index * spacing - ((spacing * index) / 2);
      break;
    case "left":
      snapX = cx - r;
      snapY = cy + index * spacing - ((spacing * index) / 2);
      break;
    case "top":
      snapX = cx + index * spacing - ((spacing * index) / 2);
      snapY = cy - r;
      break;
    case "bottom":
      snapX = cx + index * spacing - ((spacing * index) / 2);
      snapY = cy + r;
      break;
    default:
      snapX = cx;
      snapY = cy;
  }

  return { x: snapX, y: snapY, side };
};



  
  /* ---------------- PORT DRAG ---------------- */
  const updateArrowPort = (arrowId, port, x, y) => {
    const node = hitTestNode(nodes, x, y);
    setArrows(prev =>
      prev.map(a => {
        if (a.id !== arrowId) return a;

        // Not dropped on node → free drag
        if (!node) {
          return {
            ...a,
            [port]: { x, y, attachedTo: null }
          };
        }

        // Prevent loop
        const otherPort = port === "start" ? "end" : "start";
        if (a[otherPort]?.attachedTo?.nodeId === node.id) {
          return a;
        }

        
        const {x : cx, y: cy} = getNodeCenter(node);
        const dx = x - cx;
        const dy = y - cy;
        
        let side;
        if (Math.abs(dx) > Math.abs(dy)) {
          side = dx > 0 ? "right" : "left";
        } else {
          side = dy > 0 ? "bottom" : "top";
        } 
        
        // how many port are connected to node
        const index = prev.filter(ar =>
          ar[port]?.attachedTo?.nodeId === node.id &&
          ar[port]?.attachedTo?.side === side &&
          ar.id !== arrowId
        ).length;
        
        if(node.radius){
          const snap = getCircleSnapPoint(node,x,y);
          return{
            ...a,
            [port]:{
              ...snap, attachedTo: {
              nodeId: node.id,
            }
            }
          }
        }

        const snap = getSnapPoint(node, side, index);

        return {
          ...a,
          [port]: {
            ...snap,  
            attachedTo: {
              nodeId: node.id,
              side,
              index
            }
          }
        };


      })
    );
  };


  const syncArrowsWithNode = (node) => {
  setArrows(prev =>
    prev.map(a => {

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

        // Rectangle / Branch / PRS / etc
        const snap = getSnapPoint(node, side, index);

        return {
          ...snap,
          attachedTo: port.attachedTo
        };
      };

      return {
        ...a,
        start: updatePort(a.start),
        end: updatePort(a.end)
      };
    })
  );
};


  /* ---------------- DELETE ---------------- */
  const removeArrow = (arrowId) => {
    setArrows(prev => prev.filter(a => a.id !== arrowId));
  };

  const cleanupNodeArrows = (nodeId) => {
    setArrows(prev =>
      prev.filter(
        a =>
          a.start.attachedTo?.nodeId !== nodeId &&
          a.end.attachedTo?.nodeId !== nodeId
      )
    );
  };

  return {
    arrows,
    addArrow,
    updateArrowPort,
    updateArrowLabel,
    syncArrowsWithNode,
    removeArrow,
    updateArrowColor,
    cleanupNodeArrows
  };
};

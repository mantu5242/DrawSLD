import { useEffect, useRef, useState } from "react";
import { hitTestNode, getNearestBoundaryPoint } from "../../Component/Utils/Geometry";

// let arrowCount = 0;
const SIDE_OFFSET = 0;

export const useArrow = (nodes) => {
  const [arrows, setArrows] = useState(() => {
    const saved = localStorage.getItem("sld-project");
    return saved ? JSON.parse(saved).arrows || [] : [];
  });
  useEffect (() => {
    const saved = JSON.parse(localStorage.getItem("sld-project") || "{}");
    localStorage.setItem(
      "sld-project",
      JSON.stringify({ ...saved, arrows })
    );
  }, [arrows]);

  /* ---------------- ADD ARROW ---------------- */
    const arrowCountRef = useRef(
    arrows.length > 0
      ? Math.max(...arrows.map(a => parseInt(a.id.slice(1)))) + 1
      : 0
  );



  const addArrow = () => {
    setArrows(prev => [
      ...prev,
      {
        id: `a${arrowCountRef.current++}`,
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


// to create arrow from port
  const addArrowFromPorts = (from, to) => {
    console.log("from", from);
    console.log("to ", to);
    const fromNode = nodes.find(n => n.id === from.nodeId);
    const toNode = nodes.find(n => n.id === to.nodeId);
    console.log("from Node - ", fromNode);
    console.log("to Node - ", toNode);

    if(!fromNode || ! toNode) return ;
    const fromIndex = from.index ?? 0;
    const toIndex = to.index ?? 0;

    let startSnap;
    if(fromNode.radius){
      startSnap = getCircleSnapPoint(fromNode, fromNode.x, fromNode.y);
    }
    else{
      startSnap = getSnapPoint(fromNode, from.side, fromIndex);
      console.log('start snap', startSnap);
    }

    let endSnap;
    if(toNode.radius){
      endSnap = getCircleSnapPoint(toNode, toNode.x, toNode.y);
    }
    else{
      endSnap = getSnapPoint(toNode, to.side, toIndex);
      console.log('end snap', endSnap);
    }
    setArrows(prev => [
      ...prev, {
        id: `a${arrowCountRef.current++}`,
        start:{
          ...startSnap,
          attachedTo:{
            nodeId: from.nodeId,
            side: from.side,
            index: fromIndex
          }
        },
        end:{
          ...endSnap,
          attachedTo:{
            nodeId: to.nodeId,
            side: to.side,
            index: toIndex
          }
        },
        stroke: "#000",
        label: {
          text: "",
          t: 0.5,
          offset: { x: 0, y: 0 },
          visible: false,
          editing: false
        }
      }
    ])
    
  }

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


  const getSnapPoint = (node, side, index = 0) => {
  const bounds = getNodeBound(node);
  const spacing = SIDE_OFFSET; // distance between multiple ports

  switch (side) {
    case "left":
      return {
        x: bounds.left,
        y: bounds.top + bounds.height / 2 + (index * spacing) - ((spacing * (index)) / 2),
      };

    case "right":
      return {
        x: bounds.right,
        y: bounds.top + bounds.height / 2 + (index * spacing) - ((spacing * (index)) / 2)
      };
      

    case "top":
      return {
        x: bounds.left + bounds.width / 2 + (index * spacing) - ((spacing * (index)) / 2),
        y: bounds.top,
      };

    case "bottom":
      return {
        x: bounds.left + bounds.width / 2 + (index * spacing) - ((spacing * (index)) / 2),
        y: bounds.bottom,
      };

    default:
      return getNodeCenter(node);
  }
};

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

// const getCircleSnapPoint = (node, x, y, index = 0) => {
//   const portsPerSide = 2;
//   const cx = node.x;
//   const cy = node.y;
//   const r = node.radius;

//   const dx = x - cx;
//   const dy = y - cy;

//   let side;
//   if (Math.abs(dx) > Math.abs(dy)) {
//     side = dx > 0 ? "right" : "left";
//   } else {
//     side = dy > 0 ? "bottom" : "top";
//   }

//   // angle ranges for each side
//   const ranges = {
//     right: { start: -Math.PI / 4, end: Math.PI / 4 },
//     bottom: { start: Math.PI / 4, end: (3 * Math.PI) / 4 },
//     left: { start: (3 * Math.PI) / 4, end: (5 * Math.PI) / 4 },
//     top: { start: (5 * Math.PI) / 4, end: (7 * Math.PI) / 4 }
//   };

//   const { start, end } = ranges[side];
//   const t = portsPerSide === 1 ? 0.5 : (index + 1) / (portsPerSide + 1);
//   const angle = start + (end - start) * t;

//   return {
//     x: cx + Math.cos(angle) * r,
//     y: cy + Math.sin(angle) * r,
//     side
//   };
// };


  
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
    addArrowFromPorts,
    updateArrowPort,
    updateArrowLabel,
    syncArrowsWithNode,
    removeArrow,
    updateArrowColor,
    cleanupNodeArrows
  };
};

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
        // start: { x: 300, y: 200, attachedTo: null },
        // end: { x: 450, y: 200, attachedTo: null },
        start: { x: 240, y: 41, attachedTo: null },
        end: { x: 390, y: 41, attachedTo: null },
        stroke: "#000000"
      }
    ]);
  };

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




  // ------------- Snapping Logic ---------------

  const getSnapPoint = (node, side, index) => {
    const padding = 20;
    const spacing = SIDE_OFFSET;

    switch (side) {
      case "left":
        return {
          x: node.x,
          y: node.y + padding + index * spacing
        };
      case "right":
        return {
          x: node.x + node.width,
          y: node.y + padding + index * spacing
        };
      case "top":
        return {
          x: node.x + padding + index * spacing,
          y: node.y
        };
      case "bottom":
        return {
          x: node.x + padding + index * spacing,
          y: node.y + node.height
        };
      default:
        return { x: node.x, y: node.y };
    }
  };

  /* ---------------- PORT DRAG ---------------- */
  const updateArrowPort = (arrowId, port, x, y) => {
    const node = hitTestNode(nodes, x, y);
    console.log("port data",port)
    console.log("node data",node)
    console.log("coordinate of ports", x, y);

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

        const cx = node.x + node.width / 2;
        const cy = node.y + node.height / 2;

        const dx = x - cx;
        const dy = y - cy;

        let side;
        if (Math.abs(dx) > Math.abs(dy)) {
        side = dx > 0 ? "right" : "left";
        } else {
        side = dy > 0 ? "bottom" : "top";
        }


        // Count existing connections on that side
        // const index = prev.filter(
        //   ar =>
        //     ar[port]?.attachedTo?.nodeId === node.id &&
        //     ar[port]?.attachedTo?.side === side
        // ).length;
        const index = prev.filter(ar =>
            ar[port]?.attachedTo?.nodeId === node.id &&
            ar[port]?.attachedTo?.side === side &&
            ar.id !== arrowId
            ).length;

        const snap = getSnapPoint(node, side, index);
        console.log(index)

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

  /* ---------------- UPDATE ON NODE MOVE ---------------- */
  const syncArrowsWithNode = (node) => {
    setArrows(prev =>
      prev.map(a => {
        const updatePort = (port) => {
          if (port.attachedTo?.nodeId !== node.id) return port;

          return {
            ...getNearestBoundaryPoint(node, port.x, port.y),
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
    syncArrowsWithNode,
    removeArrow,
    updateArrowColor,
    cleanupNodeArrows
  };
};

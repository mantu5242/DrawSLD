import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import "./DrawSld.css";

import PrsNode from "../Component/Symbols/PrsNode";
import ValveNode from "../Component/Symbols/ValveNode";
import EsdvNode from "../Component/Symbols/EsdvNode";
import SensorNode from "../Component/Symbols/SensorNode";
import BranchNode from "../Component/Symbols/BranchNode"
import PipeArrow from "../Component/Symbols/PipeSymbols/PipeArrow";
import QpsNode from "../Component/Symbols/qpsNode"
import { hitTestNode,getNearestBoundaryPoint } from "../Component/Utils/Geometry";

let nodeCount = 0;
let arrowCount = 0;



const DrawSld = () => {
  const [nodes, setNodes] = useState([]);
  const [scale, setScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [arrows, setArrows] = useState([]);
  const [selectedArrow, setSelectedArrow] = useState(null);
  const [selected, setSelected] = useState({ type: null, id: null});
  // const [isPanning, setIsPanning] = useState(false);
  // const lastPosRef = React.useRef(null);




  const handleWheel = (e) => {
  e.evt.preventDefault();

  const scaleBy = 1.05;
  const stage = e.target.getStage();
  const oldScale = scale;

  const pointer = stage.getPointerPosition();

  const mousePointTo = {
    x: (pointer.x - stagePos.x) / oldScale,
    y: (pointer.y - stagePos.y) / oldScale,
  };

  const direction = e.evt.deltaY > 0 ? -1 : 1;
  const newScale =
    direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  setScale(newScale);

  const newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };

  setStagePos(newPos);
};
    // Add node

  const addNode = (type) => {
    setNodes([
      ...nodes,
      {
        id: `n${nodeCount++}`,
        type,
        x: 200,
        y: 100  // + nodes.length * 120,
      },
    ]);
  };


const SIDE_OFFSET = 14;

const onDragNode = (nodeId, x, y) => {
  setNodes((prev) =>
    prev.map((n) =>
      n.id === nodeId ? { ...n, x, y } : n
    )
  );

  setArrows((prev) =>
    prev.map((a) => {
      const updated = { ...a };

      ["start", "end"].forEach((port) => {
        const att = a[port].attachedTo;
        if (att?.nodeId !== nodeId) return;

        if (att.side === "right") {
          updated[port] = { ...a[port], x: x + n.width }; 
        }
        if (att.side === "bottom") {
          updated[port] = { ...a[port], y: y + n.height }; 
        }
        if(att.side === "left"){
          updated[port] = { ...a[port], x: x }
        }
        if (att.side === "top") {
          updated[port] = { ...a[port], y };
        }
      });

      return updated;
    })
  );
};

const onDropOnNode = (arrowId, port, x, y) => {

  // --------- prevent looop ------------
  const otherPort = port === "start" ? "end" : "start";
  const arrow = arrows.find((a) => a.id === arrowId);

  // -------------------------------------------------
  const node = nodes.find(
    (n) =>
      x >= n.x &&
    x <= n.x + 100 &&
    y >= n.y &&
    y <= n.y + 100
  );
  if (arrow?.[otherPort]?.attachedTo?.nodeId === node.id) {
    return; 
  }
  if (!node) return;

  const distances = {
    left: Math.abs(x - node.x),
    right: Math.abs(x - (node.x + 100)),
    top: Math.abs(y - node.y),
    bottom: Math.abs(y - (node.y + 100)),
  };

  const side = Object.keys(distances).reduce((a, b) =>
    distances[a] < distances[b] ? a : b
  );

  // count existing connections on this side
  const index = arrows.filter(
    (a) =>
      a[port].attachedTo?.nodeId === node.id &&
      a[port].attachedTo?.side === side
  ).length;

  let snapX = x;
  let snapY = y;

  if (side === "left") {
    snapX = node.x;
    snapY = node.y + 20 + index * SIDE_OFFSET;
  }
  if (side === "right") {
    // snapX = node.x + 100;
    snapX = node.x + node.width;
    snapY = node.y + 20 + index * SIDE_OFFSET;
  }
  if (side === "top") {
    snapY = node.y;
    snapX = node.x + 20 + index * SIDE_OFFSET;
  }
  if (side === "bottom") {
    // snapY = node.y + 100;
    snapY = node.y + node.height;
    snapX = node.x + 20 + index * SIDE_OFFSET;
  }

  setArrows((prev) =>
    prev.map((a) =>
      a.id === arrowId
        ? {
            ...a,
            [port]: {
              x: snapX,
              y: snapY,
              attachedTo: { nodeId: node.id, side, index },
            },
          }
        : a
    )
  );
};


  const updateNode = (id, x, y) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, x, y } : n
      )
    );

    // Rubber update arrows
    setArrows((prev) =>
      prev.map((a) => {
        const updatePort = (port) =>
          port.attachedTo === id
            ? {
                ...getNearestBoundaryPoint(
                  { x, y },
                  port.x,
                  port.y
                ),
                attachedTo: id
              }
            : port;

        return {
          ...a,
          start: updatePort(a.start),
          end: updatePort(a.end)
        };
      })
    );
  };

  const addArrow = () => {
    setArrows((prev) => [
      ...prev,
      {
        id: `a${arrowCount++}`,
        start: { x: 300, y: 200, attachedTo: null },
        end: { x: 450, y: 200, attachedTo: null }
      }
    ]);
  };

  const handlePortDrag = (arrowId, portType, x, y) => {
    const node = hitTestNode(nodes, x, y);

    setArrows((prev) =>
      prev.map((a) => {
        if (a.id !== arrowId) return a;

        const port = node
          ? {
              ...getNearestBoundaryPoint(node, x, y),
              attachedTo: node.id
            }
          : {
              x,
              y,
              attachedTo: null
            };

        return {
          ...a,
          [portType]: port
        };
      })
    );
  };


  const renderNode = (node) => {
    const commonProps = { node, onDrag: updateNode, selected: selected};
    switch (node.type) {
      case "PRS":
        return <PrsNode key={node.id} {...commonProps} onSelect={(id) =>
              setSelected({ type: "node", id })
            } />;
      case "VALVE":
        return <ValveNode key={node.id} {...commonProps} onSelect={(id) =>
              setSelected({ type: "node", id })
            }/>;
      case "ESDV":
        return <EsdvNode key={node.id} {...commonProps} onSelect={(id) =>
              setSelected({ type: "node", id })
            } />;
      case "SENSOR":
        return <SensorNode key={node.id} {...commonProps}  onSelect={(id) =>
              setSelected({ type: "node", id })
            }/>;
      case "BRANCH":
        return <BranchNode key={node.id} {...commonProps} onSelect={(id) =>
              setSelected({ type: "node", id })
            }/>;
      case "QPS":
        return <QpsNode key={node.id} {...commonProps} onSelect={(id) =>
              setSelected({ type: "node", id })
            }/>;
      
      default:
        return null;
    }
  };


  // implement function to delete or remove an object using button ...............

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key !== "Backspace" && e.key !== "Delete") return;
    if (!selected) return;
    console.log("nodes = ",nodeCount)
console.log("arrow = ", arrowCount)
    if (selected.type === "node") {
      const nodeId = selected.id;

      // remove node
      setNodes(prev => prev.filter(n => n.id !== nodeId));

      // remove connected arrows
      setArrows(prev =>
        prev.filter(
          a =>
            a.start.attachedTo?.nodeId !== nodeId &&
            a.end.attachedTo?.nodeId !== nodeId
        )
      );
    }

    if (selected.type === "edge") {
      const arrowId = selected.id;

      setArrows(prev => prev.filter(a => a.id !== arrowId));
    }

    setSelected(null);
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [selected, setNodes, setArrows]);

// -----------------------------------------------------------------------------

  return (
    <div className="drawsldmain">
     
      <div className="sidebar">
        <label className="sidebar-title">Nodes</label>
        <div className="drawsldblock" onClick={() => addNode("PRS")}>PRS</div>
        <div className="drawsldblock" onClick={() => addNode("BRANCH")}>Branch</div>
        <div className="drawsldblock" onClick={() => addNode("ESDV")}>ESDV</div>
        <div className="drawsldblock" onClick={() => addNode("SENSOR")}>Sensor</div>
        <div className="drawsldblock" onClick={() => addNode("VALVE")}>Valve</div>
        <div className="drawsldblock" onClick={() => addNode("QPS")}>QPS</div>
        <div className="drawsldblock" onClick={addArrow}>Pipe</div>

      </div>

    
      <div className="canvas">
        <Stage
          width={window.innerWidth - 260}
          height={window.innerHeight}
          scaleX={scale}
          scaleY={scale}
          x={stagePos.x}
          y={stagePos.y}
          onWheel={handleWheel}
          // onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
          onMouseDown={(e) => {
            if(e.target === e.target.getStage()){
              setSelected({type: null, id: null})
            }
          }}

    >
      <Layer>
        {arrows.map((a) => (
            <PipeArrow
              key={a.id}
              arrow={a}
              // selected={selectedArrow === a.id}
              selected={selected}
              onSelect={(id) =>
                setSelected({ type: "edge", id })
              }
              // onSelect={setSelectedArrow}
              onDragPort={handlePortDrag}
            />
          ))}
          {nodes.map((n) => renderNode(n))}
      </Layer>
    </Stage>
      </div>
    </div>
  );
};

export default DrawSld;

  


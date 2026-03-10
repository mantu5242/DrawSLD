// // Component/Symbols/BaseNode.jsx
// import { Group, Circle } from "react-konva";
// import Port from "../../Port/Port";
// import ResizeHandle from "../../Port/ResizeHandle";
// import { useState } from "react";

// const MIN_RADIUS = 20;

// const BaseNode3 = ({
//   node,
//   onDrag,
//   onResize,
//   selected,
//   onSelect,
//   children, 
//   setIsDraggingNode,
//   onStartConnect,
//   onFinishConnect
// }) => {
//   const [hovered, setHovered] = useState(false);

//   const isSelected = selected?.type === "node" && selected?.id === node.id;
//   const showPorts = hovered && !isSelected;

//   const r = node.radius;
//   const d = r * 2;
//   const nodeId = node.id;

//   // Handles based on bounding box of the circle
//   const handles = [
//     { x: -r, y: -r, cursor: "nw-resize" }, // top-left
//     { x: 0, y: -r, cursor: "n-resize" }, // top
//     { x: r, y: -r, cursor: "ne-resize" }, // top-right
//     { x: r, y: 0, cursor: "e-resize" }, // right
//     { x: r, y: r, cursor: "se-resize" }, // bottom-right
//     { x: 0, y: r, cursor: "s-resize" }, // bottom
//     { x: -r, y: r, cursor: "sw-resize" }, // bottom-left
//     { x: -r, y: 0, cursor: "w-resize" }, // left
//   ];


//   // resizing node
//   // console.log(node.x, node.y);
//   const handleDrag = (index, e) => {
//     const dx = e.target.x() - handles[index].x;
//     const dy = e.target.y() - handles[index].y;

//     let newRadius = r;

//     // scale radius uniformly
//     newRadius += Math.max(dx, dy) / 2;

//     newRadius = Math.max(newRadius, MIN_RADIUS);

//     onResize(node.id, node.x, node.y, newRadius);
//   };

//   return (
//     <Group
//       x={node.x}
//       y={node.y}
//       draggable
//       onDragStart={(e) => { e.cancelBubble = true; setIsDraggingNode(true)}}
//       onDragEnd={ (e) => { e.cancelBubble = true; setIsDraggingNode(false);}}
//       onDragMove={(e) => onDrag(node.id, e.target.x(), e.target.y())}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onMouseDown={(e) => {e.cancelBubble = true; onSelect(node.id); }}
//     >
//       {/* Circle */}
//       <Circle
//         radius={r}
//         fill="white"
//         stroke={isSelected ? "blue" : "black"}
//         strokeWidth={0.7}
//       />

//       {children}

      
//       <Port x={-r} y={0} visible={showPorts} nodeId = {nodeId} side = {"left"} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect}  />
//       <Port x={r} y={0} visible={showPorts} nodeId = {nodeId} side = {"right"} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect}  />
//       <Port y = {-r} x = {0} visible = {showPorts} nodeId = {nodeId} side = {"top"} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect}  />
//       <Port y = {r} x = {0} visible = {showPorts} nodeId = {nodeId} side = {"bottom"} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect} />

//       {/* Resize handles */}
//       {isSelected &&
//         handles.map((h, i) => (
//           <ResizeHandle
//             key={i}
//             x={h.x}
//             y={h.y}
//             cursor={h.cursor}
//             onDragEnd={(e) => handleDrag(i, e)}
//           />
//         ))}
//     </Group>
//   );
// };

// export default BaseNode3;




// import { Group, Rect, Text, Line } from "react-konva";
// import Port from "../../Port/Port";
// import ResizeHandle from "../../Port/ResizeHandle";
// import { useState } from "react";

// const MIN_SIZE = 40;

// const BaseNode3= ({ node, onDrag, onResize, selected, onSelect, type, children, setIsDraggingNode, onStartConnect, onFinishConnect }) => {
//   const [hovered, setHovered] = useState(false);
//   const isSelected = selected?.type === "node" && selected?.id === node.id;
//   const showPorts = hovered && !isSelected;
 
//   const nodeId = node.id;
//   // console.log(nodeId)

//   // 8 handles relative positions
//   const handles = [
//     { x: 0, y: 0, cursor: "nw-resize" }, // top-left
//     { x: node.width / 2, y: 0, cursor: "n-resize" }, // top
//     { x: node.width, y: 0, cursor: "ne-resize" }, // top-right
//     { x: node.width, y: node.height / 2, cursor: "e-resize" }, // right
//     { x: node.width, y: node.height, cursor: "se-resize" }, // bottom-right
//     { x: node.width / 2, y: node.height, cursor: "s-resize" }, // bottom
//     { x: 0, y: node.height, cursor: "sw-resize" }, // bottom-left
//     { x: 0, y: node.height / 2, cursor: "w-resize" }, // left
//   ];

//   // Resizing of the nodes
//   const handleDrag = (index, e) => {
//     let newWidth = node.width;
//     let newHeight = node.height;
//     let newX = node.x;
//     let newY = node.y;

//     const dx = e.target.x() - handles[index].x;
//     const dy = e.target.y() - handles[index].y;

//     switch (index) {
//       case 0: // top-left
//         newX += dx;
//         newY += dy;
//         newWidth -= dx;
//         newHeight -= dy;
//         break;
//       case 1: // top
//         newY += dy;
//         newHeight -= dy;
//         break;
//       case 2: // top-right
//         newWidth += dx;
//         newY += dy;
//         newHeight -= dy;
//         break;
//       case 3: // right
//         newWidth += dx;
//         break;
//       case 4: // bottom-right
//         newWidth += dx;
//         newHeight += dy;
//         break;
//       case 5: // bottom
//         newHeight += dy;
//         break;
//       case 6: // bottom-left
//         newX += dx;
//         newWidth -= dx;
//         newHeight += dy;
//         break;
//       case 7: // left
//         newX += dx;
//         newWidth -= dx;
//         break;
//     }

//     // enforce minimum size
//     newWidth = Math.max(newWidth, MIN_SIZE);
//     newHeight = Math.max(newHeight, MIN_SIZE);

//     onResize(node.id, newX, newY, newWidth, newHeight);
//   };

//   return (
//     <Group
//       x={node.x}
//       y={node.y}
//       draggable 
//       onDragStart={(e) => { e.cancelBubble = true; setIsDraggingNode(true)}}
//       onDragEnd={ (e) => { e.cancelBubble = true; setIsDraggingNode(false);}}
//       onDragMove={(e) => onDrag(node.id, e.target.x(), e.target.y())}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onMouseDown={(e) => { e.cancelBubble = true; onSelect(node.id); }}
//     >
//       <Rect
//         width={node.width}
//         height={node.height}
//         fill="white"
//         stroke={isSelected ? "blue" : "black"}
//         strokeWidth={0.7}
//         cornerRadius={20}
//       />
//       {children}
//       <Port x={0} y={node.height / 2} nodeId = {nodeId} side={"left"} visible={showPorts} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect} />
//       <Port x={node.width} y={node.height / 2} nodeId = {nodeId} side={"right"} visible={showPorts} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect}/>
//       <Port y={0} x={node.width / 2} nodeId = {nodeId} side={"top"} visible={showPorts} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect} />
//       <Port y={node.height} x={node.width / 2} nodeId = {nodeId} side={"bottom"} visible={showPorts} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect}/>

//       {/* 8 resize handles when selected */}  
//       {isSelected &&
//         handles.map((h, i) => (
//           <ResizeHandle
//             key={i}
//             x={h.x}
//             y={h.y}
//             cursor={h.cursor}
//             onDragEnd={(e) => handleDrag(i, e)}
//           />
//         ))}
//     </Group>
//   );
// };

// export default BaseNode3;





import { Group, Rect } from "react-konva";
import Port from "../../Port/Port";
import ResizeHandle from "../../Port/ResizeHandle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {resizeNode } from "../../../Redux/DiagramSlice";
import { setSelected } from "../../../Redux/SelectionSlice";

const MIN_SIZE = 40;

const BaseNode3 = ({
  node,
  onDrag,
  children,
  setIsDraggingNode,
  onStartConnect,
  onFinishConnect
}) => {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.selection);
  const mode = useSelector(state => state.ui.mode)
  const isReadOnly = mode === 'view'

  const [hovered, setHovered] = useState(false);

  const isSelected =
    selected?.type === "node" && selected?.id === node.id;

  const showPorts = hovered && !isSelected;

  const nodeId = node.id;

  /* ---------------- 8 RESIZE HANDLES ---------------- */
  const handles = [
    { x: 0, y: 0, cursor: "nw-resize" },
    { x: node.width / 2, y: 0, cursor: "n-resize" },
    { x: node.width, y: 0, cursor: "ne-resize" },
    { x: node.width, y: node.height / 2, cursor: "e-resize" },
    { x: node.width, y: node.height, cursor: "se-resize" },
    { x: node.width / 2, y: node.height, cursor: "s-resize" },
    { x: 0, y: node.height, cursor: "sw-resize" },
    { x: 0, y: node.height / 2, cursor: "w-resize" }
  ];

  /* ---------------- RESIZE LOGIC ---------------- */
  const handleResize = (index, e) => {
    let newWidth = node.width;
    let newHeight = node.height;
    let newX = node.x;
    let newY = node.y;

    const dx = e.target.x() - handles[index].x;
    const dy = e.target.y() - handles[index].y;

    switch (index) {
      case 0:
        newX += dx;
        newY += dy;
        newWidth -= dx;
        newHeight -= dy;
        break;
      case 1:
        newY += dy;
        newHeight -= dy;
        break;
      case 2:
        newWidth += dx;
        newY += dy;
        newHeight -= dy;
        break;
      case 3:
        newWidth += dx;
        break;
      case 4:
        newWidth += dx;
        newHeight += dy;
        break;
      case 5:
        newHeight += dy;
        break;
      case 6:
        newX += dx;
        newWidth -= dx;
        newHeight += dy;
        break;
      case 7:
        newX += dx;
        newWidth -= dx;
        break;
    }

    newWidth = Math.max(newWidth, MIN_SIZE);
    newHeight = Math.max(newHeight, MIN_SIZE);

    dispatch(
      resizeNode({
        nodeId,
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight
      })
    );
  };

  return (
    <Group
      x={node.x}
      y={node.y}
      draggable = {!isReadOnly}
      onDragStart={(e) => {
        e.cancelBubble = true;
        setIsDraggingNode(true);
      }}
      onDragEnd={(e) => {
        e.cancelBubble = true;
        setIsDraggingNode(false);
      }}
      onDragMove={(e) => {
         onDrag(node.id, e.target.x(), e.target.y())
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={(e) => {
        e.cancelBubble = true;
        dispatch(setSelected({ type: "node", id: nodeId }));
      }}
    >
      <Rect
        width={node.width}
        height={node.height}
        fill="white"
        stroke={isSelected ? "blue" : "black"}
        strokeWidth={0.7}
        cornerRadius={20}
      />

      {children}

      {/* ---------- PORTS ---------- */}
      <Port
        x={0}
        y={node.height / 2}
        nodeId={nodeId}
        side="left"
        visible={!isReadOnly && showPorts}
        onStartConnect={onStartConnect}
        onFinishConnect={onFinishConnect}
      />

      <Port
        x={node.width}
        y={node.height / 2}
        nodeId={nodeId}
        side="right"
        visible={!isReadOnly && showPorts}
        onStartConnect={onStartConnect}
        onFinishConnect={onFinishConnect}
      />

      <Port
        x={node.width / 2}
        y={0}
        nodeId={nodeId}
        side="top"
        visible={!isReadOnly && showPorts}
        onStartConnect={onStartConnect}
        onFinishConnect={onFinishConnect}
      />

      <Port
        x={node.width / 2}
        y={node.height}
        nodeId={nodeId}
        side="bottom"
        visible={!isReadOnly && showPorts}
        onStartConnect={onStartConnect}
        onFinishConnect={onFinishConnect}
      />

      {/* ---------- RESIZE HANDLES ---------- */}
      {isSelected &&
        handles.map((h, i) => (
          <ResizeHandle
            key={i}
            x={h.x}
            y={h.y}
            cursor={h.cursor}
            onDragEnd={(e) => handleResize(i, e)}
          />
        ))}
    </Group>
  );
};

export default BaseNode3;
// // Component/Symbols/BaseNode.jsx
// import { Group, Rect, Text } from "react-konva";
// import Port from "../Port/Port";
// import ResizeHandle from "../Port/ResizeHandle";
// import { useState } from "react";

// const MIN_SIZE = 40;

// const BaseNode = ({ node, onDrag, onResize, selected, onSelect, type, children, setIsDraggingNode, onStartConnect, onFinishConnect }) => {
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
//         cornerRadius={8}
//       />
//       {children}

//       {/* Hover-only connection ports */}
//       {/* <Port x={0} y={node.height / 2} visible={hovered} /> */}
//       {/* <Port x={node.width} y={node.height / 2} visible={hovered} /> */}
//       <Port x={0} y={node.height / 2} nodeId = {nodeId} side={"left"} visible={showPorts} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect} />
//       <Port x={node.width} y={node.height / 2} nodeId = {nodeId} side={"right"} visible={showPorts} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect}/>
//       {/* <Port y={0} x={node.width / 2} visible={hovered} /> */}
//       {/* <Port y={node.height} x={node.width / 2}  visible={hovered} /> */}
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

// export default BaseNode;




import { Group, Rect } from "react-konva";
import Port from "../Port/Port";
import ResizeHandle from "../Port/ResizeHandle";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSelected, setSelected } from "../../Redux/SelectionSlice"; 

const MIN_SIZE = 40;

const BaseNode = ({
  node,
  onDrag,
  onResize,
  // type,
  children,
  setIsDraggingNode,
  onStartConnect,
  onFinishConnect
}) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selection);
  const mode = useSelector(state => state.ui.mode)
  const isReadOnly = mode === 'view'
  
  const [hovered, setHovered] = useState(false);
  const hoverTimeout = useRef(null);
  const isSelected =
    selected?.type === "node" && selected?.id === node.id;

  const showPorts = hovered && !isSelected;
  const nodeId = node.id;

  // 8 resize handles
  useEffect(() => {
    if (!isReadOnly) return;
    if (
    selected?.type === "node" &&
    selected?.id === node.id &&
    selected?.pinned === false &&
    hovered === false
  ) {
    dispatch(clearSelected());
  }
}, [hovered, selected, isReadOnly, node.id, dispatch]);


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

  const handleDrag = (index, e) => {
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

    onResize(node.id, newX, newY, newWidth, newHeight);
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
      onDragMove={(e) =>
        onDrag(node.id, e.target.x(), e.target.y())
      }
      // onMouseEnter={() => {
      //   setHovered(true);
      //   if (isReadOnly && !isSelected) {
      //     hoverTimeout.current = setTimeout(() => {
      //       dispatch(setSelected({ type: "node", id: node.id }));
      //     }, 500); // ⏳ delay
      //   }

      // }}
      // onMouseLeave={() => {
      //   setHovered(false);
      //   if (hoverTimeout.current) {
      //     clearTimeout(hoverTimeout.current);
      //     hoverTimeout.current = null;
      //   }
      // }}
      // onMouseDown={(e) => {
      //   // if(isReadOnly) return;
      //   e.cancelBubble = true;
      //   if (isReadOnly) {
      //     dispatch(setSelected({ type: "node", id: node.id }));
      //     return;
      //   }
      //   dispatch(setSelected({ type: "node", id: node.id }));
      // }}
        onMouseEnter={() => {
          setHovered(true);

          if (isReadOnly && !isSelected) {
            hoverTimeout.current = setTimeout(() => {
              dispatch(
                setSelected({
                  type: "node",
                  id: node.id,
                  pinned: false 
                })
              );
            }, 300);
          }
        }}

        onMouseLeave={() => {
          setHovered(false);

          if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
          }

          // 👇 close only if opened by hover
          // if (
          //   isReadOnly &&
          //   selected?.type === "node" &&
          //   selected?.id === node.id &&
          //   !selected?.pinned
          // ) {
          //   dispatch(clearSelected());
          // }
        }}

        onMouseDown={(e) => {
          e.cancelBubble = true;

          dispatch(
            setSelected({
              type: "node",
              id: node.id,
              pinned: true 
            })
          );
        }}
    //  onClick={isReadOnly && handleClick()}
    >
      <Rect
        width={node.width}
        height={node.height}
        fill="white"
        stroke={isSelected ? "blue" : "black"}
        strokeWidth={0.7}
        cornerRadius={8}
      />

      {children}

      {/* Connection Ports */}
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
        y={0}
        x={node.width / 2}
        nodeId={nodeId}
        side="top"
        visible={!isReadOnly && showPorts}
        onStartConnect={onStartConnect}
        onFinishConnect={onFinishConnect}
      />

      <Port
        y={node.height}
        x={node.width / 2}
        nodeId={nodeId}
        side="bottom"
        visible={!isReadOnly && showPorts}
        onStartConnect={onStartConnect}
        onFinishConnect={onFinishConnect}
      />

      {/* view + selected = 0 */}
      {/* edit + selected = 1 */}

      {/* Resize Handles */}
      {mode === "edit" && isSelected &&
        handles.map((h, i) => (
          <ResizeHandle
            key={i}
            x={h.x}
            y={h.y}
            cursor={h.cursor}
            onDragEnd={(e) => handleDrag(i, e)}
          />
        ))}
    </Group>
  );
};

export default BaseNode;

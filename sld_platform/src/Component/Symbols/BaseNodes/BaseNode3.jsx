// Component/Symbols/BaseNode.jsx
import { Group, Circle } from "react-konva";
import Port from "../../Port/Port";
import ResizeHandle from "../../Port/ResizeHandle";
import { useState } from "react";

const MIN_RADIUS = 20;

const BaseNode3 = ({
  node,
  onDrag,
  onResize,
  selected,
  onSelect,
  children, 
  setIsDraggingNode,
  onStartConnect,
  onFinishConnect
}) => {
  const [hovered, setHovered] = useState(false);

  const isSelected = selected?.type === "node" && selected?.id === node.id;
  const showPorts = hovered && !isSelected;

  const r = node.radius;
  const d = r * 2;

  // Handles based on bounding box of the circle
  const handles = [
    { x: -r, y: -r, cursor: "nw-resize" }, // top-left
    { x: 0, y: -r, cursor: "n-resize" }, // top
    { x: r, y: -r, cursor: "ne-resize" }, // top-right
    { x: r, y: 0, cursor: "e-resize" }, // right
    { x: r, y: r, cursor: "se-resize" }, // bottom-right
    { x: 0, y: r, cursor: "s-resize" }, // bottom
    { x: -r, y: r, cursor: "sw-resize" }, // bottom-left
    { x: -r, y: 0, cursor: "w-resize" }, // left
  ];

  const handleDrag = (index, e) => {
    const dx = e.target.x() - handles[index].x;
    const dy = e.target.y() - handles[index].y;

    let newRadius = r;

    // scale radius uniformly
    newRadius += Math.max(dx, dy) / 2;

    newRadius = Math.max(newRadius, MIN_RADIUS);

    onResize(node.id, node.x, node.y, newRadius);
  };

  return (
    <Group
      x={node.x}
      y={node.y}
      draggable
       onDragStart={(e) => { e.cancelBubble = true; setIsDraggingNode(true)}}
      onDragEnd={ (e) => { e.cancelBubble = true; setIsDraggingNode(false);}}
      onDragMove={(e) => onDrag(node.id, e.target.x(), e.target.y())}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={(e) => {
        e.cancelBubble = true;
        onSelect(node.id);
      }}
    >
      {/* Circle */}
      <Circle
        radius={r}
        fill="white"
        stroke={isSelected ? "blue" : "black"}
        strokeWidth={0.7}
      />

      {children}

      
      <Port x={-r} y={0} visible={showPorts} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect}  />
      <Port x={r} y={0} visible={showPorts} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect}  />
      <Port y = {-r} x = {0} visible = {showPorts} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect}  />
      <Port y = {r} x = {0} visible = {showPorts} onStartConnect={onStartConnect} onFinishConnect={onFinishConnect} />

      {/* Resize handles */}
      {isSelected &&
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

export default BaseNode3;

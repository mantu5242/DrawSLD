// Component/Symbols/BaseNode.jsx
import { Group, Rect, Text, Line } from "react-konva";
import Port from "../../Port/Port";
import ResizeHandle from "../../Port/ResizeHandle";
import { useState } from "react";

const MIN_SIZE = 40;

const BaseNode2 = ({ node, onDrag, onResize, selected, onSelect, type, children }) => {
  const [hovered, setHovered] = useState(false);
  const isSelected = selected?.type === "node" && selected?.id === node.id;
  const showPorts = hovered && !isSelected;

  // 8 handles relative positions
  const handles = [
    { x: 0, y: 0, cursor: "nw-resize" }, // top-left
    { x: node.width / 2, y: 0, cursor: "n-resize" }, // top
    { x: node.width, y: 0, cursor: "ne-resize" }, // top-right
    { x: node.width, y: node.height / 2, cursor: "e-resize" }, // right
    { x: node.width, y: node.height, cursor: "se-resize" }, // bottom-right
    { x: node.width / 2, y: node.height, cursor: "s-resize" }, // bottom
    { x: 0, y: node.height, cursor: "sw-resize" }, // bottom-left
    { x: 0, y: node.height / 2, cursor: "w-resize" }, // left
  ];

  // Resizing of the nodes
  const handleDrag = (index, e) => {
    let newWidth = node.width;
    let newHeight = node.height;
    let newX = node.x;
    let newY = node.y;

    const dx = e.target.x() - handles[index].x;
    const dy = e.target.y() - handles[index].y;

    switch (index) {
      case 0: // top-left
        newX += dx;
        newY += dy;
        newWidth -= dx;
        newHeight -= dy;
        break;
      case 1: // top
        newY += dy;
        newHeight -= dy;
        break;
      case 2: // top-right
        newWidth += dx;
        newY += dy;
        newHeight -= dy;
        break;
      case 3: // right
        newWidth += dx;
        break;
      case 4: // bottom-right
        newWidth += dx;
        newHeight += dy;
        break;
      case 5: // bottom
        newHeight += dy;
        break;
      case 6: // bottom-left
        newX += dx;
        newWidth -= dx;
        newHeight += dy;
        break;
      case 7: // left
        newX += dx;
        newWidth -= dx;
        break;
    }

    // enforce minimum size
    newWidth = Math.max(newWidth, MIN_SIZE);
    newHeight = Math.max(newHeight, MIN_SIZE);

    onResize(node.id, newX, newY, newWidth, newHeight);
  };

  return (
    <Group
      x={node.x}
      y={node.y}
      draggable
      onDragMove={(e) => onDrag(node.id, e.target.x(), e.target.y())}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={(e) => { e.cancelBubble = true; onSelect(node.id); }}
    >
      <Rect
        width={node.width}
        height={node.height}
        fill="white"
        stroke={isSelected ? "blue" : "black"}
        strokeWidth={0.7}
        // cornerRadius={8}
      />
      <Line
        points={[
            0, node.height,
            node.width, 0
        ]}
        stroke="black"
        strokeWidth={0.7}
      />

      {children}

      {/* Hover-only connection ports */}
      <Port x={0} y={node.height / 2} visible={hovered} />
      <Port x={node.width} y={node.height / 2} visible={hovered} />
      <Port x={0} y={node.height / 2} visible={showPorts} />
      <Port x={node.width} y={node.height / 2} visible={showPorts} />
      <Port y={0} x={node.width / 2} visible={hovered} />
      <Port y={node.height} x={node.width / 2} visible={hovered} />
      <Port y={0} x={node.width / 2} visible={showPorts} />
      <Port y={node.height} x={node.width / 2} visible={showPorts} />
      {/* 8 resize handles when selected */}
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

export default BaseNode2;

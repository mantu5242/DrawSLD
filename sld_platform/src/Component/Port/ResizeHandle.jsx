// Component/Port/ResizeHandle.jsx
import { Circle } from "react-konva";

const ResizeHandle = ({ x, y,cursor, size = 8, onDragEnd }) => {
  return (
    <Circle
      x={x}
      y={y}
      radius={size / 2}
      fill="white"
      stroke="blue"
      strokeWidth={2}
      draggable
      onDragEnd={onDragEnd}
    onMouseEnter={(e) => {
    e.target.getStage().container().style.cursor = cursor;
    }}

    onMouseLeave={(e) => {
        e.target.getStage().container().style.cursor = "default";
    }}
    />
  );
};

export default ResizeHandle;

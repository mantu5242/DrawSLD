// Component/Port/Port.jsx
import { Circle } from "react-konva";

const Port = ({ x, y, radius = 3, visible = true, onMouseDown }) => {
  if (!visible) return null;
  return (
    <Circle
      x={x}
      y={y}
      radius={radius}
      fill="green"
      stroke="black"
      strokeWidth={1}
      onMouseDown={onMouseDown}
    />
  );
};

export default Port;

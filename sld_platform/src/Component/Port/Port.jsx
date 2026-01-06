
import { Circle } from "react-konva";

const Port = ({ x, y, onMouseDown }) => {
  return (
    <Circle
      x={x}
      y={y}
      radius={4}
      fill="#1976d2"
      stroke="white"
      strokeWidth={1}
      onMouseDown={onMouseDown}
    />
  );
};

export default Port;

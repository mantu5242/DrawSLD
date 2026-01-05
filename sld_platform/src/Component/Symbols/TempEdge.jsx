// Component/Symbols/TempEdge.jsx
import { Line } from "react-konva";

const TempEdge = ({ start, end }) => {
  if (!start || !end) return null;

  return (
    <Line
      points={[start.x, start.y, end.x, end.y]}
      stroke="#999"
      strokeWidth={2}
      dash={[6, 4]}
    />
  );
};

export default TempEdge;

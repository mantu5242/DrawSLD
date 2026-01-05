// Component/Symbols/PipeEdge.jsx
import { Arrow } from "react-konva";

const PipeEdge = ({ sourceNode, targetNode }) => {
  if (!sourceNode || !targetNode) return null;

  return (
    <Arrow
      points={[
        sourceNode.x + 100,
        sourceNode.y + 50,
        targetNode.x,
        targetNode.y + 50,
      ]}
      stroke="green"
      fill="green"
      strokeWidth={3}
      pointerLength={8}
      pointerWidth={8}
    />
  );
};

export default PipeEdge;

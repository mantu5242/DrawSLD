// Component/Port/Port.jsx
import { Circle } from "react-konva";
import { getWorldPointer } from "../Utils/World";

const Port = ({ x, y, nodeId, side, radius = 4, visible = true, onStartConnect, onFinishConnect }) => {
  // console.log("Node id - ", nodeId)
  if (!visible) return null;
  return (
    <Circle
      x={x}
      y={y}
      radius={radius}
      fill="green"
      stroke="black"
      strokeWidth={1}
      onMouseEnter={(e) => {e.cancelBubble = true; e.target.getStage().container().style.cursor = 'pointer';}}
      onMouseLeave={(e) => {e.cancelBubble = true; e.target.getStage().container().style.cursor = 'default';}}
      onMouseDown={(e) => {
        e.cancelBubble = true; 
        const stage = e.target.getStage();
        const pos = getWorldPointer(stage);
        onStartConnect(nodeId ,side,pos); }}
      onMouseUp={(e) => {e.cancelBubble  = true; onFinishConnect(nodeId, side)}}

    />
  );
};

export default Port;

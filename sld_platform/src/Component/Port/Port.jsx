import { Circle } from "react-konva";

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
        const port = e.target;

        // convert port position → world space
        const transform = stage.getAbsoluteTransform().copy();
        transform.invert();

        const absPos = port.getAbsolutePosition();
        const worldPos = transform.point(absPos);

        onStartConnect(nodeId, side, worldPos);
      }}
      onMouseUp={(e) => {e.cancelBubble  = true; onFinishConnect(nodeId, side)}}

    />
  );
};

export default Port;

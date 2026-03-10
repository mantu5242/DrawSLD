import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const PressureNode = ({
  node,
  onDrag,
  onResize,
  setIsDraggingNode,
  onStartConnect,
  onFinishConnect
}) => {
    const { temperature, pressure, volume} = node.readings || {};
  return (
    <BaseNode
      node={node}
      onDrag={onDrag}
      onResize={onResize}
      setIsDraggingNode={setIsDraggingNode}
      onStartConnect={onStartConnect}
      onFinishConnect={onFinishConnect}
    >
      <Text
        text="Prsr"
        width={node.width}
        align="center"
        y={5}
        fontStyle="bold"
      />
      <Text
        text={`Pressure: ${pressure ?? 0}`}
        width={node.width}
        align="center"
        y={20}
        fontSize={7}
      />
    </BaseNode>
  );
};

export default PressureNode;
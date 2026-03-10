// import { Text } from "react-konva";
// import BaseNode from "./BaseNode";

// const MeterNode = (props) => {
//   const { node } = props;

//   return (
//     <BaseNode {...props}>
//       <Text
//         text="Meter"
//         width={node.width}
//         height={node.height}
//         align="center"
//         verticalAlign="middle"
//       />
//     </BaseNode>
//   );
// };

// export default MeterNode;




import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const MeterNode = ({
  node,
  onDrag,
  onResize,
  setIsDraggingNode,
  onStartConnect,
  onFinishConnect
}) => {
  const { temperature, pressure, volume } = node.readings || {};
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
        text="Meter"
        width={node.width}
        align="center"
        y={5}
        fontStyle="bold"
      />

      {/* Temperature */}
      <Text
        text={`Temp: ${temperature ?? 0}`}
        width={node.width}
        align="center"
        y={20}
        fontSize={7}
      />

      {/* Pressure */}
      <Text
        text={`Pressure: ${pressure ?? 0}`}
        width={node.width}
        align="center"
        y={27}
        fontSize={7}
      />

      {/* Volume */}
      <Text
        text={`Volume: ${volume ?? 0}`}
        width={node.width}
        align="center"
        y={34}
        fontSize={7}
      />
    </BaseNode>
  );
};

export default MeterNode;

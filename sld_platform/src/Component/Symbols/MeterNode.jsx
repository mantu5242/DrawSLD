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
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default MeterNode;

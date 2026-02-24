// import { Text } from "react-konva";
// import BaseNode from "./BaseNode";

// const ReducerNode = (props) => {
//   const { node } = props;

//   return (
//     <BaseNode {...props}>
//       <Text
//         text="Reducer"
//         width={node.width}
//         height={node.height}
//         align="center"
//         verticalAlign="middle"
//       />
//     </BaseNode>
//   );
// };

// export default ReducerNode;




import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const ReducerNode = ({
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
        text="Reducer"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default ReducerNode;

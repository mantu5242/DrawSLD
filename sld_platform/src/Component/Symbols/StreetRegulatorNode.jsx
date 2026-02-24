// import { Text } from "react-konva";
// import BaseNode from "./BaseNode";

// const StreetRegulatorNode = (props) => {
//   const { node } = props;

//   return (  
//     <BaseNode {...props}>
//       <Text
//         text="str_Reg"
//         width={node.width}
//         height={node.height}
//         align="center"
//         verticalAlign="middle"
//       />
//     </BaseNode>
//   );
// };

// export default StreetRegulatorNode;



import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const StreetRegulatorNode = ({
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
        text="Str-Reg"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default StreetRegulatorNode
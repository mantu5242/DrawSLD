// // Component/Symbols/PrsNode.jsx
// import { Group, Rect, Text } from "react-konva";
// import Port from "../Port/Port";



// const EsdvNode = ({ node, onDrag, selected, onSelect }) => { 
//   const isSelected = selected?.type === 'node' && selected?.id === node.id;
//   return (
//     <Group
//       x={node.x}
//       y={node.y}
//       draggable
//       onDragMove={(e) =>
//         onDrag(node.id, e.target.x(), e.target.y())
//       }
//       onMouseDown={(e) => {
//         e.cancelBubble = true;
//         onSelect(node.id);
//       }}
//       onMouseEnter={(e) => e.target.getStage().container().style.cursor = 'move'}
//       onMouseLeave={(e) => e.target.getStage().container().style.cursor = 'default'}
//     >
//       <Rect
//         width={100}
//         height={100}
//         fill="white"
//         stroke={isSelected ? 'blue':'black'}
//         strokeWidth={2}
//         cornerRadius={8}
//       />

//       <Text
//         text="ESDV"
//         width={100}
//         height={100}
//         align="center"
//         verticalAlign="middle"
//       />

//       {isSelected && (
//         <>
//           {/* IN port */}
//           <Port
//             x={0} 
//             y={50}
//             // onMouseDown={() =>
//             //   onStartConnect?.(node.id)
//             // }
//           />

//           {/* OUT port */}
//           <Port
//             x={100}
//             y={50}
//           />
//         </>
//       )}
//     </Group>
//   );
// };

// export default EsdvNode;


// import { Text } from "react-konva";
// import BaseNode from "./BaseNode";

// const EsdvNode = (props) => {
//   const { node } = props;

//   return (
//     <BaseNode {...props}>
//       <Text
//         text="ESDV"
//         width={node.width}
//         height={node.height}
//         align="center"
//         verticalAlign="middle"
//       />
//     </BaseNode>
//   );
// };

// export default EsdvNode;



import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const EsdvNode = ({
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
        text="PRS"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default EsdvNode;
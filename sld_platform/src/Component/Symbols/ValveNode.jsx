// // Component/Symbols/PrsNode.jsx
// import React from "react";
// import { Group, Rect, Line, Stage, Layer } from "react-konva";

// const ValveNode = ({ x = 100, y = 100 }) => {
//   const width = 80;
//   const height = 40;

//   return (

//     <Stage width={window.innerWidth} height={window.innerHeight}>
//       <Layer>
//         <Group x={x} y={y} draggable>
//           <Rect
//             width={width}
//             height={height}
//             stroke="black"
//             strokeWidth={2}
//             fill="#f5f5f5"
//           />

//           <Line
//             points={[
//               0, height,
//               width, 0
//             ]}
//             stroke="black"
//             strokeWidth={2}
//           />
//         </Group>
//       </Layer>
//     </Stage>
//   );
// };

// export default ValveNode;




import { Text } from "react-konva";
import BaseNode2 from "./BaseNodes/BaseNode2";

const ValveNode = (props) => {
  const { node } = props;

  return (
    <BaseNode2 {...props}>
      <Text
        text="Valve"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode2>
  );
};

export default ValveNode;

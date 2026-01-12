// import React from 'react'
// import { Group, Layer, Stage,Circle } from 'react-konva'

// const BranchNode = ({ x = 100, y = 100 }) => {
//   const radius = 20

//   return (
//     <Stage width={window.innerWidth} height={window.innerHeight}>
//           <Layer>
//               <Group x={x} y={y} draggable>
//                 <Circle
//                   x={0}
//                   y={0}
//                   radius={radius}
//                   stroke="black"
//                   strokeWidth={0.7}
//                   fill="#fff394ff"
//                 />
//               </Group>
//           </Layer>
//         </Stage>
//   )
// }

// export default BranchNode


import { Text } from "react-konva";
import BaseNode from "./BaseNodes/BaseNode3";

const BranchNode3 = (props) => {
  const { node } = props;

  return (
    <BaseNode {...props}>
      <Text
        // text="Branch"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default BranchNode3;
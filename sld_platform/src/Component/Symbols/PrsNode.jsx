// // Component/Symbols/PrsNode.jsx
// import { Group, Rect, Text, Transformer } from "react-konva";
// import Port from "../Port/Port";
// import { useRef, useEffect } from "react";

// const MIN_SIZE = 40;


// const PrsNode = ({ node, onDrag,onResize, selected, onSelect }, ref) => { 
//   const isSelected = selected?.type === 'node' && selected?.id === node.id;
//   // const shapeRef = useRef();
//   // const trRef = useRef();

//   // useEffect(() => {
//   //   if (selected?.type === "node" && selected.id === node.id) {
//   //     trRef.current.nodes([shapeRef.current]);
//   //     trRef.current.getLayer().batchDraw();
//   //   }
//   // }, [selected, node.id]);

//   return (
//     <Group
//       x={node.x}
//       y={node.y}
//       draggable
//       ref={ref}
//       onDragMove={(e) =>
//         onDrag(node.id, e.target.x(), e.target.y())
//       }
//       onMouseDown={(e) => {
//         e.cancelBubble = true;
//         onSelect(node.id);
//       }}
//       onMouseEnter={(e) => e.target.getStage().container().style.cursor = 'move'}
//       onMouseLeave={(e) => e.target.getStage().container().style.cursor = 'default'}

//       onTransformEnd={(e) => {
//           const shape = shapeRef.current;
//           const scaleX = shape.scaleX();
//           const scaleY = shape.scaleY();

//           // reset scale
//           shape.scaleX(1);
//           shape.scaleY(1);

//           onResize(
//             node.id,
//             shape.x(),
//             shape.y(),
//             Math.max(MIN_SIZE, shape.width() * scaleX),
//             Math.max(MIN_SIZE, shape.height() * scaleY)
//           );
//         }}
//     >
//       <Rect
//         width={node.width}
//         height={node.height}
//         fill="white"
//         stroke={isSelected ? 'blue':'black'}
//         strokeWidth={2}
//         cornerRadius={8}
//       />

//       <Text
//         text="PRS"
//         width={node.width}
//         height={node.height}
//         align="center"
//         verticalAlign="middle"
//       />

//       {selected?.type === "node" && selected.id === node.id && (
//         <Transformer
//           ref={trRef}
//           boundBoxFunc={(oldBox, newBox) => {            
//             if (newBox.width < MIN_SIZE || newBox.height < MIN_SIZE) 
//             {
//               return oldBox;
//             }
//             return newBox;
//           }}
//         />
//       )}

//       {isSelected && (
//         <>
          
//           <Port
//             x={0} 
//             y={node.height / 2}
            
//           />

//           {/* OUT port */}
//           <Port
//             x={100}
//             y={node.height / 2}
//           />
//         </>
//       )}
//     </Group>
//   );
// };

// export default PrsNode;




// import { Group, Rect, Text, Circle, Transformer } from "react-konva";
// import { useRef, useState, useEffect, forwardRef } from "react";

// const MIN_SIZE = 40;

// const PrsNode = forwardRef(({ node, onDrag, onResize, selected, onSelect }, ref) => {
//   const isSelected = selected?.type === "node" && selected?.id === node.id;
//   const [hover, setHover] = useState(false);
//   const trRef = useRef();

//   // Show Transformer when node selected
//   useEffect(() => {
//     if (isSelected && trRef.current) {
//       trRef.current.nodes([ref.current]);
//       trRef.current.getLayer().batchDraw();
//     }
//   }, [isSelected, ref]);

//   // connection ports positions (only visible on hover)
//   const ports = [
//     { x: 0, y: node.height / 2 },          // left
//     { x: node.width, y: node.height / 2 }, // right
//     { x: node.width / 2, y: 0 },           // top
//     { x: node.width / 2, y: node.height }, // bottom
//   ];

//   return (
//     <Group
//       x={node.x}
//       y={node.y}
//       draggable
//       ref={ref}
//       onDragMove={(e) => onDrag(node.id, e.target.x(), e.target.y())}
//       onMouseDown={(e) => { e.cancelBubble = true; onSelect(node.id); }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       onTransformEnd={(e) => {
//         const shape = ref.current;
//         const scaleX = shape.scaleX();
//         const scaleY = shape.scaleY();
//         shape.scaleX(1);
//         shape.scaleY(1);

//         onResize(
//           node.id,
//           shape.x(),
//           shape.y(),
//           Math.max(MIN_SIZE, shape.width() * scaleX),
//           Math.max(MIN_SIZE, shape.height() * scaleY)
//         );
//       }}
//     >
//       {/* Node rectangle */}
//       <Rect
//         width={node.width}
//         height={node.height}
//         fill="white"
//         stroke={isSelected ? "blue" : "black"}
//         strokeWidth={2}
//         cornerRadius={8}
//       />

//       {/* Node label */}
//       <Text
//         text="PRS"
//         width={node.width}
//         height={node.height}
//         align="center"
//         verticalAlign="middle"
//       />

//       {/* Transformer for resizing */}
//       {isSelected && <Transformer
//         ref={trRef}
//         rotateEnabled={false}
//         anchorSize={8}
//         boundBoxFunc={(oldBox, newBox) => {
//           if (newBox.width < MIN_SIZE || newBox.height < MIN_SIZE) return oldBox;
//           return newBox;
//         }}
//       />}

//       {/* Connection ports — visible on hover */}
//       {hover && ports.map((p, i) => (
//         <Circle
//           key={i}
//           x={p.x}
//           y={p.y}
//           radius={6}
//           fill="green"
//           stroke="black"
//           strokeWidth={1}
//           draggable
//           dragBoundFunc={(pos) => pos} // optional if you want draggable ports
//         />
//       ))}
//     </Group>
//   );
// });

// export default PrsNode;



// Component/Symbols/PrsNode.jsx
import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const PrsNode = (props) => {
  const { node } = props;

  return (
    <BaseNode {...props}>
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

export default PrsNode;

// // Component/Symbols/PipeArrow.jsx
// import { useEffect, useRef } from "react";
// import { Group, Arrow, Circle, Text } from "react-konva";
// import { getOrthogonalPath } from "../../Utils/OrthogonalPath";
// import { getWorldPointer } from "../../Utils/World";
// import { getMidPoint, getPointAtT } from "../../Utils/Geometry";

// const PipeArrow = ({
//   arrow,
//   selected,
//   onSelect,
//   onDragPort
// }) => {
//   if (!arrow?.start || !arrow?.end) return null;
//   const isSelected = selected?.type === "edge" && selected?.id === arrow.id;
//   const isConnected = arrow.start.attachedTo || arrow.end.attachedTo;
//   const points = getOrthogonalPath(arrow.start, arrow.end)
  

  
//   const label = arrow.label;
//   let labelPos = null;
//   if(label?.visible){   // only when label is not hidden
//     const base = getPointAtT(points,label.t); // calculate the relative mid position
//     labelPos = {      // offset position of the label 
//       x : base.x + label.offset.x,
//       y : base.y + label.offset.y
//     }
//   }


//   // animated arrow  -------------
//   const lineRef = useRef();
//   useEffect(() => {
//     let offset = 0;

//     const anim = new window.Konva.Animation(() => {
//       offset -= 1;
//       lineRef.current.dashOffset(offset);
//     }, lineRef.current.getLayer());

//     anim.start();

//     return () => anim.stop();
//   }, []);

//   return (
//    {label?.visible && (
//       <Group 
//         x={labelPos.x}
//         y={labelPos.y}
//         draggable
//         onDragEnd={(e) => {
//         const dx = e.target.x() - labelPos.x;
//         const dy = e.target.y() - labelPos.y; 

//         arrow.label.offset.x += dx;
//         arrow.label.offset.y += dy;
//       }}
//         onMouseDown={(e) => { e.cancelBubble = true; onSelect(arrow.id); }} 
//         onMouseEnter={(e) => e.target.getStage().container().style.cursor = 'move'}
//         onMouseLeave={(e) => e.target.getStage().container().style.cursor = 'default'} 
//       >
//       <Arrow         
//         points={points}
//         stroke={arrow.stroke || "black"}
//         fill={arrow.stroke || "black"}
//         strokeWidth={3}
//         pointerLength={8}
//         pointerWidth={8}  
//         ref={lineRef}
//         dash={[20, 10]}
//       />
//       <Text
//         text={label.text || "text"}
//         fontSize={14}
//         fill="#000"
//         padding={4}
//         background="#ffffff"
//       />
//       {isSelected && (
//         <>
//           <Circle
//             x={arrow.start.x}
//             y={arrow.start.y}
//             radius={6}
//             fill="#1951d2ff"
//             draggable
//             onDragMove={(e) =>{
//               const stage = e.target.getStage();
//               const absPos = getWorldPointer(stage);

//               e.target.position({
//                 x: arrow.start.x,
//                 y: arrow.start.y
//               }); 
//               onDragPort(
//                 arrow.id,
//                 "start",
//                 absPos.x,
//                 absPos.y,
//               );
//             }
//             }           
//             />
//           <Circle
//             x={arrow.end.x}
//             y={arrow.end.y}
//             radius={6}
//             fill="#1976d2"
//             draggable
//             onDragMove={(e) =>{
//               const stage = e.target.getStage();
//               const absPos = getWorldPointer(stage);

//               e.target.position({
//                 x: arrow.end.x,
//                 y: arrow.end.y
//               }); 
//               onDragPort(
//                 arrow.id,
//                 "end",
//                 absPos.x,
//                 absPos.y,
//               );
//             }

//             }
            
//           />
//         </>
//       )}
//     </Group>
//    )}
  
//   )
// };

// export default PipeArrow;

// Component/Symbols/PipeArrow.jsx
import { useEffect, useRef, useState } from "react";
import { Group, Arrow, Circle, Text } from "react-konva";
import { getOrthogonalPath } from "../../Utils/OrthogonalPath";
import { getWorldPointer } from "../../Utils/World";
import { getPointAtT } from "../../Utils/Geometry";
import { Html } from "react-konva-utils";

const PipeArrow = ({ arrow, selected, onSelect, onDragPort, stageRef, setEditingLabel }) => {
  if (!arrow?.start || !arrow?.end) return null;

  const isSelected = selected?.type === "edge" && selected?.id === arrow.id;
  const points = getOrthogonalPath(arrow.start, arrow.end);

  /* ---------------- LABEL POSITION ---------------- */
  const label = arrow.label;
  let labelPos = null;

  if (label?.visible) {
    const base = getPointAtT(points, label.t);
    labelPos = {
      x: base.x + (label.offset?.x || 0),
      y: base.y + (label.offset?.y || 0)
    };
  }
  // console.log("visibility - ",arrow.label.visible)  


  /* ---------------- ANIMATION ---------------- */
  const lineRef = useRef();
  useEffect(() => {
    let offset = 0;
    const anim = new window.Konva.Animation(() => {
      offset -= 1;
      lineRef.current.dashOffset(offset);
    }, lineRef.current.getLayer());

    anim.start();
    return () => anim.stop();
  }, []);

// compute screen position before calling editor
  const stage = lineRef.current?.getStage();
  if(stage && labelPos){
    arrow.labelScreenPos = stage.getAbsoluteTransform().point(labelPos)
  }

  return (
    <>
      {/* ---------- ARROW ---------- */}
      <Arrow
        points={points}
        stroke={arrow.stroke || "black"}
        fill={arrow.stroke || "black"}
        strokeWidth={3}
        pointerLength={8}
        pointerWidth={8}
        ref={lineRef}
        dash={[20, 10]}
        onMouseDown={(e) => { e.cancelBubble = true; onSelect(arrow.id); }}
        onMouseEnter={(e) => e.target.getStage().container().style.cursor = 'move'}
        onMouseLeave={(e) => e.target.getStage().container().style.cursor = 'default'}
        onDblClick={(e) => {
          e.cancelBubble = true;
          arrow.label.visible = true;
          setEditingLabel(arrow)
        }}
      />
      
      {/* ---------- LABEL ---------- */}
        {arrow.label?.visible && labelPos && (
        <Text
          x={labelPos.x}
          y={labelPos.y}
          text={arrow.label.text || "Label"}
          fontSize={14}
          offsetX={20}
          offsetY={10}
          draggable
          onDblClick={(e) => {
            e.cancelBubble = true;
            setEditingLabel(arrow);
          }}
          onDragEnd={(e) => {
            arrow.label.offset = {
              x: (arrow.label.offset?.x || 0) + e.target.x() - labelPos.x,
              y: (arrow.label.offset?.y || 0) + e.target.y() - labelPos.y
            };
          }}
        />
      )}
      {/* ---------- PORTS ---------- */}
      {isSelected && (
        <>
          <Circle
            x={arrow.start.x}
            y={arrow.start.y}
            radius={6}
            fill="#1951d2"
            draggable
            onDragMove={(e) => {
              const stage = e.target.getStage();
              const pos = getWorldPointer(stage);
              e.target.position({ x: arrow.start.x, y: arrow.start.y });
              onDragPort(arrow.id, "start", pos.x, pos.y);
            }}
            onMouseEnter={(e) => e.target.getStage().container().style.cursor = 'pointer'}
            onMouseLeave={(e) => e.target.getStage().container().style.cursor = 'default'}
          />
          <Circle
            x={arrow.end.x}
            y={arrow.end.y}
            radius={6}
            fill="#1976d2"
            draggable
            onDragMove={(e) => {
              const stage = e.target.getStage();
              const pos = getWorldPointer(stage);
              e.target.position({ x: arrow.end.x, y: arrow.end.y });
              onDragPort(arrow.id, "end", pos.x, pos.y);
            }}
            onMouseEnter={(e) => e.target.getStage().container().style.cursor = 'pointer'}
            onMouseLeave={(e) => e.target.getStage().container().style.cursor = 'default'}
          />
        </>
      )}
    </>
  );
};

export default PipeArrow;

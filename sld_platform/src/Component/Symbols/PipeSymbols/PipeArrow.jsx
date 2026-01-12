// Component/Symbols/PipeArrow.jsx
import { useEffect, useRef } from "react";
import { Group, Arrow, Circle } from "react-konva";
import { getOrthogonalPath } from "../../Utils/OrthogonalPath";
import { getWorldPointer } from "../../Utils/World";

const PipeArrow = ({
  arrow,
  selected,
  onSelect,
  onDragPort
}) => {
  if (!arrow?.start || !arrow?.end) return null;
  const isSelected = selected?.type === "edge" && selected?.id === arrow.id;
  const isConnected = arrow.start.attachedTo || arrow.end.attachedTo;
  const points = getOrthogonalPath(arrow.start, arrow.end)

  // animated arrow  -------------
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

  return (
    <Group 
    onMouseDown={(e) => { e.cancelBubble = true;
      onSelect(arrow.id); }} 
      // draggable = {!isConnected}     // disable for proper working of snapping and dragging
      
      onMouseEnter={(e) => e.target.getStage().container().style.cursor = 'move'}
      onMouseLeave={(e) => e.target.getStage().container().style.cursor = 'default'}
  
  >
      <Arrow         
        points={points}
        stroke={arrow.stroke || "black"}
        fill={arrow.stroke || "black"}
        strokeWidth={3}
        pointerLength={8}
        pointerWidth={8}  
        ref={lineRef}
        dash={[20, 10]}
      />

      {isSelected && (
        <>
          {/* START PORT */}
          <Circle
            x={arrow.start.x}
            y={arrow.start.y}
            radius={6}
            fill="#1951d2ff"
            draggable
            onDragMove={(e) =>{
              const stage = e.target.getStage();
              const absPos = getWorldPointer(stage);

              e.target.position({
                x: arrow.start.x,
                y: arrow.start.y
              }); 
              onDragPort(
                arrow.id,
                "start",
                absPos.x,
                absPos.y,
                // true
              );
            }

            }
            
            />

          {/* END PORT */}
          <Circle
            x={arrow.end.x}
            y={arrow.end.y}
            radius={6}
            fill="#1976d2"
            draggable
            onDragMove={(e) =>{
              const stage = e.target.getStage();
              const absPos = getWorldPointer(stage);

              e.target.position({
                x: arrow.end.x,
                y: arrow.end.y
              }); 
              onDragPort(
                arrow.id,
                "end",
                absPos.x,
                absPos.y,
                // true
              );
            }

            }
            
          />
        </>
      )}
    </Group>
  );
};

export default PipeArrow;

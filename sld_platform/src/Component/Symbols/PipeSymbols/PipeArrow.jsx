// Component/Symbols/PipeArrow.jsx
import { Group, Arrow, Circle } from "react-konva";

const PipeArrow = ({
  arrow,
  selected,
  onSelect,
  onDragPort
}) => {

  const isSelected = selected?.type === "edge" && selected?.id === arrow.id;
  const isConnected = arrow.start.attachedTo || arrow.end.attachedTo;

  return (
    <Group 
    onMouseDown={(e) => { e.cancelBubble = true;
      onSelect(arrow.id); }} 
      draggable = {!isConnected}
      onMouseEnter={(e) => e.target.getStage().container().style.cursor = 'move'}
      onMouseLeave={(e) => e.target.getStage().container().style.cursor = 'default'}
  
  >
      <Arrow        
        points={[
          arrow.start.x,
          arrow.start.y,
          arrow.end.x,
          arrow.end.y
        ]}  
        stroke="green"
        fill="green"
        strokeWidth={3}
        pointerLength={8}
        pointerWidth={8}
      />

      {isSelected && (
        <>
          {/* START PORT */}
          <Circle
            x={arrow.start.x}
            y={arrow.start.y}
            radius={6}
            fill="#1976d2"
            draggable
            onDragMove={(e) =>
              onDragPort(
                arrow.id,
                "start",
                e.target.x(),
                e.target.y(),
                true
              )

            }
            
            />

          {/* END PORT */}
          <Circle
            x={arrow.end.x}
            y={arrow.end.y}
            radius={6}
            fill="#1976d2"
            draggable
            onDragMove={(e) =>
              onDragPort(
                arrow.id,
                "end",
                e.target.x(),
                e.target.y(),
                true
              )
            }
            
          />
        </>
      )}
    </Group>
  );
};

export default PipeArrow;

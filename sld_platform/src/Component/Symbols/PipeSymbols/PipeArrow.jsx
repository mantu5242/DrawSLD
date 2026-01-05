// Component/Symbols/PipeArrow.jsx
import { Group, Arrow, Circle } from "react-konva";

const PipeArrow = ({
  arrow,
  selected,
  onSelect,
  onDragPort
}) => {
  return (
    <Group onClick={() => onSelect(arrow.id)} draggable>
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

      {selected && (
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

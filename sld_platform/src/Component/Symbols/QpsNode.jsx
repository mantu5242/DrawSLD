// Component/Symbols/PrsNode.jsx
import { Group, Rect, Text } from "react-konva";
import Port from "../Port/Port";



const QpsNode = ({ node, onDrag, selected, onSelect }) => { 
  const isSelected = selected?.type === 'node' && selected?.id === node.id;
  return (
    <Group
      x={node.x}
      y={node.y}
      draggable
      onDragMove={(e) =>
        onDrag(node.id, e.target.x(), e.target.y())
      }
      onMouseDown={(e) => {
        e.cancelBubble = true;
        onSelect(node.id);
      }}
      onMouseEnter={(e) => e.target.getStage().container().style.cursor = 'move'}
      onMouseLeave={(e) => e.target.getStage().container().style.cursor = 'default'}
    >
      <Rect
        width={100}
        height={100}
        fill="white"
        stroke={isSelected ? 'blue':'black'}
        strokeWidth={2}
        cornerRadius={8}
      />

      <Text
        text="QPS"
        width={100}
        height={100}
        align="center"
        verticalAlign="middle"
      />

      {isSelected && (
        <>
          {/* IN port */}
          <Port
            x={0} 
            y={50}
            // onMouseDown={() =>
            //   onStartConnect?.(node.id)
            // }
          />

          {/* OUT port */}
          <Port
            x={100}
            y={50}
          />
        </>
      )}
    </Group>
  );
};

export default QpsNode;

// Component/Symbols/PrsNode.jsx
import { Group, Rect, Text } from "react-konva";
import Port from "../Port/Port";

const ValveNode = ({ node, selected, onDrag, onStartConnect }) => {
  return (
    <Group
      x={node.x}
      y={node.y}
      draggable
      onDragMove={(e) =>
        onDrag(node.id, e.target.x(), e.target.y())
      }
    >
      <Rect
        width={100}
        height={100}
        fill="white"
        stroke="black"
        strokeWidth={2}
        cornerRadius={8}
      />

      <Text
        text="Valve"
        width={100}
        height={100}
        align="center"
        verticalAlign="middle"
      />

      {selected && (
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
            // onMouseDown={() =>
            //   onStartConnect?.(node.id)
            // }
          />
        </>
      )}
    </Group>
  );
};

export default ValveNode;

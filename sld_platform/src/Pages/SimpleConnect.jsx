import React, { useState } from "react";
import { Stage, Layer, Circle, Line } from "react-konva";

const SimpleConnect = () => {
  const [node1, setNode1] = useState({ x: 100, y: 100 });
  const [node2, setNode2] = useState({ x: 300, y: 200 });

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* LINE */}
        <Line
          points={[
            node1.x,
            node1.y,
            node2.x,
            node2.y
          ]}
          stroke="black"
          strokeWidth={2}
        />

        {/* NODE 1 */}
        <Circle
          x={node1.x}
          y={node1.y}
          radius={30}
          fill="red"
          draggable
          onDragMove={(e) =>
            setNode1({
              x: e.target.x(),
              y: e.target.y()
            })
          }
        />

        {/* NODE 2 */}
        <Circle
          x={node2.x}
          y={node2.y}
          radius={30}
          fill="blue"
          draggable
          onDragMove={(e) =>
            setNode2({
              x: e.target.x(),
              y: e.target.y()
            })
          }
        />
      </Layer>
    </Stage>
  );
};

export default SimpleConnect;

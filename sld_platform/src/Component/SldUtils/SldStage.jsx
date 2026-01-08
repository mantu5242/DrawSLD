import { Stage, Layer, Transformer } from "react-konva";
import ArrowsRenderer from "./ArrowRenderer";
import NodesRenderer from "./NodesRenderer";
import { useRef, useEffect } from "react";

const SldStage = ({
  nodes,
  arrows,
  selected,
  setSelected,
  updateNode,
  resizeNode,
  updateArrowPort,
  scale = 1,
  stagePos = {x : 0,y : 0},
  handleWheel
}) => {
  const trRef = useRef();
  const shapeRefs = useRef({});

  useEffect(() => {
    if (selected?.type === "node" && trRef.current) {
      const nodeRef = shapeRefs.current[selected.id];
      if (nodeRef) {
        trRef.current.nodes([nodeRef]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selected]);

  return (
    <div className="canvas">
      <Stage
        width={window.innerWidth - 260}
        height={window.innerHeight}
        scaleX={scale}
        scaleY={scale}
        x={stagePos.x}
        y={stagePos.y}
        onWheel={handleWheel}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setSelected({ type: null, id: null });
          }
        }}
      >
        <Layer>
          <ArrowsRenderer
            arrows={arrows}
            selected={selected}
            setSelected={setSelected}
            onDragPort={updateArrowPort}
          />
          <NodesRenderer
            nodes={nodes}
            selected={selected}
            setSelected={setSelected}
            updateNode={updateNode}
            resizeNode={resizeNode}
            shapeRefs={shapeRefs}
          />
          {selected?.type === "node" && (
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => newBox.width < 40 || newBox.height < 40 ? oldBox : newBox}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default SldStage;

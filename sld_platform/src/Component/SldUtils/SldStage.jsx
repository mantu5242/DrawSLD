import { Stage, Layer, Transformer } from "react-konva";
import ArrowsRenderer from "./ArrowRenderer";
import NodesRenderer from "./NodesRenderer";
import { useRef, useEffect, useState } from "react";
import GridLayer from "../Utils/GridLayer";
const SCALE_BY = 1.05;

const SldStage = ({
  nodes,
  arrows,
  selected,
  setSelected,
  updateNode,
  resizeNode,
  updateArrowPort,
  // scale = 1,
  // stagePos = {x : 0,y : 0},
  // handleWheel
}) => {
  const trRef = useRef();
  const shapeRefs = useRef({});
  const [scale, setScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const width = window.innerWidth - 260; // sidebar width
  const height = window.innerHeight;

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    if (!pointer) return;

    const oldScale = scale;
    //  const direction = e.evt.deltaY < 0 ? 1 : -1;
    // 👉 position in world coordinates
    const mousePointTo = {
      x: (pointer.x - stagePos.x) / oldScale,
      y: (pointer.y - stagePos.y) / oldScale
    };

    // zoom direction
    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale =
      direction > 0 ? oldScale * SCALE_BY : oldScale / SCALE_BY;

    // 👉 calculate new position so cursor stays fixed
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale
    };

    setScale(newScale);
    setStagePos(newPos);
  };

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
        <Layer listening={false}>
            <GridLayer
              // width={window.innerWidth - 260}
              // height={window.innerHeight}
              width={width}
              height={height}
              scale={scale}
              stagePos={stagePos}
            />
        </Layer>
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

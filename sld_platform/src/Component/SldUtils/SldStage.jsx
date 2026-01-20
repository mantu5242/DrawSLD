import { Stage, Layer, Transformer, Arrow } from "react-konva";
import ArrowsRenderer from "./ArrowRenderer";
import NodesRenderer from "./NodesRenderer";
import { useRef, useEffect, useState } from "react";
import GridLayer from "../Utils/GridLayer";
import { getWorldPointer } from "../Utils/World";
import { getNearestBoundaryPoint } from "../Utils/Geometry";
const SCALE_BY = 1.05;

const SldStage = ({
  stageRef,
  setEditingLabel,
  connecting,
  setConnecting,
  nodes,
  arrows,
  selected,
  setSelected,
  updateNode,
  resizeNode,
  updateArrowPort,
  addArrowFromPorts
}) => {
  const trRef = useRef();
  const shapeRefs = useRef({});
  const [scale, setScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [isDraggingNode, setIsDraggingNode] = useState(false);
  const width = window.innerWidth; // sidebar width
  const height = window.innerHeight;

  const handleStageDragEnd = (e) => {
    setStagePos({
      x: e.target.x(),
      y: e.target.y(),
    });
  };
  
  const handleWheel = (e) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    if (!pointer) return;

    const oldScale = scale;
    const mousePointTo = {
      x: (pointer.x - stagePos.x) / oldScale,
      y: (pointer.y - stagePos.y) / oldScale
    };

    // zoom direction
    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale =
      direction > 0 ? oldScale * SCALE_BY : oldScale / SCALE_BY;

    // calculate new position so cursor stays fixed
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale
    };

  

    setScale(newScale);
    setStagePos(newPos);
  };
  const startConnect = (nodeId, side) => {
    setConnecting({
      from: { nodeId, side },
      to: null
    });
  };

  const finishConnect = (toNodeId, toSide) => {
    if(!connecting) return ;
    if(connecting.from.nodeId === toNodeId){
      setConnecting(null);
      return;
    }

    addArrowFromPorts(connecting.from, {nodeId: toNodeId, side: toSide});
    setConnecting(null);

  }

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
        draggable = {!isDraggingNode}
        ref={stageRef}
        width={window.innerWidth - 260}
        height={window.innerHeight}
        scaleX={scale}
        scaleY={scale}
        x={stagePos.x}
        y={stagePos.y}
        onWheel={handleWheel}
        onDragEnd={handleStageDragEnd}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setSelected({ type: null, id: null });
          }
        }}
        onMouseMove={(e) => {
          if(!connecting) return;
          const stage = e.target.getStage();
          const pos = getWorldPointer(stage);
          setConnecting(prev => ({...prev, to: pos}))
        }}
        onMouseUp={(e) => {if(connecting) setConnecting(null)}}
        
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
            setEditingLabel = {setEditingLabel}
          />
            {connecting && (() => {
              console.log(connecting)
              const fromNode = nodes.find(n => n.id === connecting.from.nodeId);
              // console.log("from Node - ",fromNode)
              if (!fromNode || !connecting.to) return null;

              const start = getNearestBoundaryPoint(
                fromNode,
                connecting.to.x,
                connecting.to.y
              );

              return (
                <Arrow
                  points={[
                    start.x,
                    start.y,
                    connecting.to.x,
                    connecting.to.y
                  ]}
                  stroke="black"
                  dash={[6, 4]}
                  pointerLength={10}
                  pointerWidth={10}
                  listening={false}
                />
              );
            })()}

          <NodesRenderer
            nodes={nodes}
            selected={selected}
            setSelected={setSelected}
            updateNode={updateNode}
            resizeNode={resizeNode}
            shapeRefs={shapeRefs}
            setIsDraggingNode = {setIsDraggingNode}
            onStartConnect = {startConnect}
            onFinishConnect = {finishConnect}
            
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

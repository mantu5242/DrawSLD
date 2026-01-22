import { useEffect, useRef, useState } from "react";
import { Group, Arrow, Circle, Text } from "react-konva";
import { getOrthogonalPath } from "../../Utils/OrthogonalPath";
import { getWorldPointer } from "../../Utils/World";
import { getPointAtT } from "../../Utils/Geometry";

const PipeArrow = ({ arrow, selected, onSelect, onDragPort, stageRef, setEditingLabel }) => {
  if (!arrow?.start || !arrow?.end) return null;

  const isSelected = selected?.type === "edge" && selected?.id === arrow.id;
  const points = getOrthogonalPath(arrow.start, arrow.end);
  const dragStartRef = useRef(null);

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


  // for making the text area editable
  const startLabelEditing = (e) => {
    e.cancelBubble = true;
    const stage = e.target.getStage();
    const base = getPointAtT(points, arrow.label.t);
    const labelPos = {
      x: base.x + (arrow.label.offset?.x || 0),
      y: base.y + (arrow.label.offset?.y || 0)
    };

    const labelScreenPos =
      stage.getAbsoluteTransform().point(labelPos);

    arrow.label.visible = true;

    setEditingLabel({
      arrowId: arrow.id,
      label: arrow.label,
      labelScreenPos
    });
  };

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
        onDblClick={startLabelEditing}
       draggable
        onDragStart={(e) => {
          e.cancelBubble = true;
          dragRef.current = {
            x: e.target.x(),
            y: e.target.y()
          };
        }}
        onDragMove={(e) => {
          e.cancelBubble = true;

          const dx = e.target.x() - dragRef.current.x;
          const dy = e.target.y() - dragRef.current.y;

          onMoveArrow(arrow.id, dx, dy);

          dragRef.current = {
            x: e.target.x(),
            y: e.target.y()
          };
        }}
        onDragEnd={(e) => {
          e.cancelBubble = true;
          e.target.position({ x: 0, y: 0 }); // important
        }}
      />
      
      {/* ---------- LABEL ---------- */}
        {arrow.label?.visible && labelPos && (
        <Text
          x={labelPos.x}
          y={labelPos.y}
          text={arrow.label.text || ""}
          fontSize={14}
          offsetX={20}
          offsetY={10}
          draggable
          onDragStart={(e) => {
            e.cancelBubble = true;
          }}
          onDblClick={startLabelEditing}
          onDragEnd={(e) => {
            e.cancelBubble = true;
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
            onDragStart={(e) => {e.cancelBubble = true}}
            onDragEnd={(e) => {e.cancelBubble = true}}
            onDragMove={(e) => {
              e.cancelBubble = true;
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
            onDragStart={(e) => {
              e.cancelBubble = true;
            }}
            onDragEnd={(e) => {e.cancelBubble = true}}
            onDragMove={(e) => {
              e.cancelBubble = true;
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

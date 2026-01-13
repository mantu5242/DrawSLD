import React, { useState, useRef } from "react";
import Sidebar from "../Component/SideBar/Sidebar";
import SldStage from "../Component/SldUtils/SldStage";
import { UseNodes } from "../Component/Hooks/UseNode";
import { useArrow } from "../Component/Hooks/UseArrow";
import { UseKeyDelete } from "../Component/Hooks/UseKeyDelete";
import { useStageTransform } from "../Component/Hooks/UseStageTranformer";
import ArrowTextArea  from "../Component/Symbols/LabelArea/ArrowTextArea"

const DrawSld = () => {
  const [selected, setSelected] = useState({ type: null, id: null });
  const stageRef = useRef(null);
  const [editingLabel, setEditingLabel] = useState(null);
  const { nodes, addNode, updateNode, resizeNode, removeNode } = UseNodes();
  const {  arrows, addArrow, updateArrowPort, removeArrow, updateArrowColor, cleanupNodeArrows, syncArrowsWithNode } = useArrow(nodes);

  const handleUpdateNode = (id, x, y) => {
    updateNode(id, x, y);
    const node = nodes.find(n => n.id === id);
    if (node) {
      syncArrowsWithNode({
        ...node,
        x,
        y
      });
    }
  };

  const handleResizeNode = (id, x, y, w, h) => {
    resizeNode(id, x, y, w, h);
    syncArrowsWithNode({
      id,
      x,
      y,
      width: w,
      height: h
    });
  };

  const stageTransform = useStageTransform();
  UseKeyDelete(selected, removeNode, removeArrow, cleanupNodeArrows, setSelected);

  return (
    <div className="drawsldmain">
      <Sidebar 
        addNode={addNode} 
        addArrow={addArrow} 
        selected={selected}
        onEdgeColorChange={(color) => {
          if (selected?.type === "edge") {
            updateArrowColor(selected.id, color);
          }
        }}
      />

      <SldStage
        stageRef = {stageRef}
        setEditingLabel = {setEditingLabel}
        nodes={nodes}
        arrows={arrows}
        selected={selected}
        setSelected={(sel) => {
          setSelected(sel);
          setEditingLabel(null);  // stop editing on click
        }}
        updateNode={handleUpdateNode}
        resizeNode={handleResizeNode}
        updateArrowPort={updateArrowPort}
        {...stageTransform}
      />
      {editingLabel && stageRef.current && (
        <textarea
          autoFocus
          value={editingLabel.label.text}
          onChange={(e) => {
            editingLabel.label.text = e.target.value;
          }}
          onBlur={() => setEditingLabel(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setEditingLabel(null);
            }
          }}
          style={{
            position: "absolute",
            left:
              stageRef.current.container().getBoundingClientRect().left +
              editingLabel.labelScreenPos.x,
            top:
              stageRef.current.container().getBoundingClientRect().top +
              editingLabel.labelScreenPos.y,
            fontSize: "14px",
            padding: "4px",
            border: "1px solid #1976d2",
            outline: "none",
            background: "white",
            zIndex: 10
          }}
        />
      )}
    </div>
  );
};

export default DrawSld;

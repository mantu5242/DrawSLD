import React, { useState, useRef } from "react";
import Sidebar from "../Component/SideBar/Sidebar";
import SldStage from "../Component/SldUtils/SldStage";
import { UseNodes } from "../Component/Hooks/UseNode";
import { useArrow } from "../Component/Hooks/UseArrow";
import { UseKeyDelete } from "../Component/Hooks/UseKeyDelete";
import { useStageTransform } from "../Component/Hooks/UseStageTranformer";
import ArrowTextArea from "../Component/TextArea/ArrowTextArea";

const DrawSld = () => {
  const [selected, setSelected] = useState({ type: null, id: null });
  const stageRef = useRef(null);
  const [editingLabel, setEditingLabel] = useState(null);
  const [connecting, setConnecting] = useState(null);
  const { nodes, addNode, updateNode, resizeNode, removeNode } = UseNodes();
  const {  arrows, addArrow,addArrowFromPorts, updateArrowPort, updateArrowLabel, removeArrow, updateArrowColor, cleanupNodeArrows, syncArrowsWithNode } = useArrow(nodes);

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

  // To save the label from the textarea to the arrow
  const commitLabelChange = () => {
    if (!editingLabel) return;

    updateArrowLabel(editingLabel.arrowId, editingLabel.label.text);
    setEditingLabel(null);
  };


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
        connecting = {connecting}
        setConnecting = {setConnecting}
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
        addArrowFromPorts = {addArrowFromPorts}
        {...stageTransform}
      />
      {editingLabel && stageRef.current && (
        <ArrowTextArea
          editingLabel = { editingLabel}
          setEditingLabel = {setEditingLabel}
          commitLabelChange = {commitLabelChange}
          stageRef = { stageRef }
        />
      )}
    </div>
  );
};

export default DrawSld;

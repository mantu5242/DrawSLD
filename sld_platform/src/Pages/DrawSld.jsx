import React, { useState, useRef } from "react";
import Sidebar from "../Component/SideBar/Sidebar";
import SldStage from "../Component/SldUtils/SldStage";
import { UseNodes } from "../Component/Hooks/UseNode";
import { useArrow } from "../Component/Hooks/UseArrow";
import { UseKeyDelete } from "../Component/Hooks/UseKeyDelete";
import { useStageTransform } from "../Component/Hooks/UseStageTranformer";
import ArrowTextArea from "../Component/TextArea/ArrowTextArea";
import NavBar from "../Component/NavBar/NavBar";

const DrawSld = () => {
  const [selected, setSelected] = useState({ type: null, id: null });
  const stageRef = useRef(null);
  const [editingLabel, setEditingLabel] = useState(null);
  const [connecting, setConnecting] = useState(null);
  const { nodes, setNodes, addNode, updateNode, resizeNode, removeNode} = UseNodes();
  const {  arrows, setArrows, addArrow,addArrowFromPorts, updateArrowPort, updateArrowLabel, removeArrow, updateArrowColor, cleanupNodeArrows, syncArrowsWithNode, moveArrow } = useArrow(nodes);

  const handleImport = (json) => {
    // const json = JSON.parse(data);
    console.log(typeof json);
    if(!json?.nodes || !json?.arrows){
      console.error("Invalid SLD file structure");
      return ;
    }
    setNodes(json.nodes);
    setArrows(json.arrows);
  }

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
    <div className="project-main-page">
      <NavBar stageRef={stageRef} onImport = {handleImport} selected = {selected} 
        onEdgeColorChange={(color) => {
              if (selected?.type === "edge") {
                updateArrowColor(selected.id, color);
              }
            }}
      />
      <div className="drawsldmain">
        <Sidebar 
          addNode={addNode} 
          addArrow={addArrow} 
          selected={selected}
          
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
          moveArrow = {moveArrow}
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
    </div>
  );
};

export default DrawSld;
// import React, { useState, useRef } from "react";
// import Sidebar from "../Component/SideBar/Sidebar";
// import SldStage from "../Component/SldUtils/SldStage";
// import { UseNodes } from "../Component/Hooks/UseNode";
// import { useArrow } from "../Component/Hooks/UseArrow";
// import { UseKeyDelete } from "../Component/Hooks/UseKeyDelete";
// import { useStageTransform } from "../Component/Hooks/UseStageTranformer";
// import ArrowTextArea from "../Component/TextArea/ArrowTextArea";
// import NavBar from "../Component/NavBar/NavBar";
// import { useSelector } from "react-redux";

// const DrawSld = () => {
//   const mode = useSelector(state => state.diagram.mode);
//   const isReadOnly = mode === 'view';
//   const [selected, setSelected] = useState({ type: null, id: null });
//   // const [editMode, setEditMode] = useState(false);
//   const stageRef = useRef(null);
//   const [editingLabel, setEditingLabel] = useState(null);
//   const [connecting, setConnecting] = useState(null);
//   const {  addNode, updateNode, resizeNode, removeNode} = UseNodes();
//   const {  addArrow, addArrowFromPorts, updateArrowPort, updateArrowLabel, removeArrow, updateArrowColor, cleanupNodeArrows, syncArrowsWithNode, moveArrow } = useArrow(nodes);

//   const diagram  = useSelector(state => state.diagram.history.present);
//   const nodes = diagram.nodes
//   const arrows = diagram.arrows
  
//   const handleImport = (json) => {
//     // const json = JSON.parse(data);
//     console.log(typeof json);
//     if(!json?.nodes || !json?.arrows){
//       console.error("Invalid SLD file structure");
//       return ;
//     }
//     setNodes(json.nodes);
//     setArrows(json.arrows);
//   }

//   const handleUpdateNode = (id, x, y) => {
//     updateNode(id, x, y);
//     const node = nodes.find(n => n.id === id);
//     if (node) {
//       syncArrowsWithNode({
//         ...node,
//         x,
//         y
//       });
//     }
//   };

//   const handleResizeNode = (id, x, y, w, h) => {
//     resizeNode(id, x, y, w, h);
//     syncArrowsWithNode({
//       id,
//       x,
//       y,
//       width: w,
//       height: h
//     });
//   };


//   const stageTransform = useStageTransform();
//   UseKeyDelete(selected, removeNode, removeArrow, cleanupNodeArrows, setSelected);

//   // To save the label from the textarea to the arrow
//   const commitLabelChange = () => {
//     if (!editingLabel) return;

//     updateArrowLabel(editingLabel.arrowId, editingLabel.label.text);
//     setEditingLabel(null);
//   };

//   // console.log("editing mode",editMode)
//   return (
//     <div className="project-main-page">
//       {/* <NavBar setEditMode = {setEditMode} stageRef={stageRef} onImport = {handleImport} selected = {selected} 
//         onEdgeColorChange={(color) => {
//               if (selected?.type === "edge") {
//                 updateArrowColor(selected.id, color);
//               }
//             }}
//       /> */}

      
//       <div className="drawsldmain"> 
//         {!isReadOnly && <Sidebar 
//           addNode={addNode} 
//           addArrow={addArrow} 
//           selected={selected}
          
//         />}

//         <SldStage
//           stageRef = {stageRef}
//           setEditingLabel = {setEditingLabel}
//           connecting = {connecting}
//           setConnecting = {setConnecting}
//           nodes={nodes}
//           arrows={arrows}
//           selected={selected}
//           setSelected={(sel) => {
//             setSelected(sel);
//             setEditingLabel(null);  // stop editing on click
//           }}
//           updateNode={handleUpdateNode}
//           resizeNode={handleResizeNode}
//           updateArrowPort={updateArrowPort}
//           addArrowFromPorts = {addArrowFromPorts}
//           moveArrow = {moveArrow}
//           {...stageTransform}
//         />
//         {editingLabel && stageRef.current && (
//           <ArrowTextArea
//             editingLabel = { editingLabel}
//             setEditingLabel = {setEditingLabel}
//             commitLabelChange = {commitLabelChange}
//             stageRef = { stageRef }
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default DrawSld;






import React, { useRef, useState } from "react";
import Sidebar from "../Component/SideBar/Sidebar";
import SldStage from "../Component/SldUtils/SldStage";
import ArrowTextArea from "../Component/TextArea/ArrowTextArea";
import { useSelector, useDispatch } from "react-redux";
import { useKeyDelete } from "../Component/Hooks/UseKeyDelete";
import { addNode,  addArrow, updateArrowLabel} from "../Redux/DiagramSlice";

const DrawSld = ({scale , setScale, stageRef}) => {
  const dispatch = useDispatch();
  useKeyDelete();

  const mode = useSelector(state => state.ui.mode);
  const isReadOnly = mode === "view";

  const diagram = useSelector(state => state.history.present);

  // const stageRef = useRef(null);
  const [editingLabel, setEditingLabel] = useState(null);

  const selected = useSelector(state => state.selection);
  

  const nodes = diagram.nodes;
  const arrows = diagram.arrows;

  // const handleImport = (json) => {
  //   if (!json?.nodes || !json?.arrows) {
  //     console.error("Invalid SLD file structure");
  //     return;
  //   }

  //   dispatch(importDiagram(json));
  // };

  const commitLabelChange = () => {
    if (!editingLabel) return;

    dispatch(
      updateArrowLabel({
        arrowId: editingLabel.arrowId,
        text: editingLabel.label.text
      })
    );

    setEditingLabel(null);
  };

  // const handleEdgeColorChange = (color) => {
  //   if (selected?.type === "edge") {
  //     dispatch(
  //       updateArrowColor({
  //         id: selected.id,
  //         color
  //       })
  //     );
  //   }
  // };

  return (
    <div className="project-main-page">
      <div className="drawsldmain">
        {!isReadOnly && (
          <Sidebar
            addNode={(type) => dispatch(addNode(type))}
            addArrow={() => dispatch(addArrow())}
            selected={selected}
          />
        )}

        <SldStage
          scale = {scale}
          setScale = {setScale}
          stageRef={stageRef}
          setEditingLabel={setEditingLabel}
        />

        {editingLabel && stageRef.current && (
          <ArrowTextArea
            editingLabel={editingLabel}
            setEditingLabel={setEditingLabel}
            commitLabelChange={commitLabelChange}
            stageRef={stageRef}
          />
        )}
      </div>
    </div>
  );
};

export default DrawSld;
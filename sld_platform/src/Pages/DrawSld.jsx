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
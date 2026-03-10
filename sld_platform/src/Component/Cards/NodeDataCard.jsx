import React from "react";
import { FiX } from "react-icons/fi";
import { MdOutlineDeviceThermostat } from "react-icons/md";
import { WiBarometer } from "react-icons/wi";
import { FiBox } from "react-icons/fi";
import "./NodeDataCard.css";
import { useDispatch, useSelector } from "react-redux";
// import { setSelected } from "../../Redux/SelectionSlice";
import { clearSelected } from "../../Redux/SelectionSlice";

const allowedNodeTypes = new Set([
  'QPS', 'PRS', 'METER', 'STREETREGULATOR', 'REDUCER','ESV', 'PRESSURESENSOR', 'TEMPERATURESENSOR'
])

const NodeDataCard = ({scale, stagePos}) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selection);
  const nodes = useSelector((state) => state.history.present.nodes);
  const mode = useSelector((state) => state.ui.mode);

  if (mode !== "view") return null;
  if (!selected || selected.type !== "node") return null;

  const node = nodes.find(n => n.id === selected.id);
  if(!allowedNodeTypes.has(node.type)) return null;
  // console.log(node)
  if (!node) return null;
  const screenX = node.x * scale + stagePos.x;
  const screenY = node.y * scale + stagePos.y;
  const left = screenX + (node.width * scale);
  const top = screenY - 170;

  return (
    // <div className="card-overlay">
      <div className="node-card"
        style={{
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 1000
      }}
      >
        
        {/* Header */}
        <div className="card-header">
          <h2>{node.type}</h2> 
          <FiX className="close-icon"  onClick={() => dispatch(clearSelected())}/>
        </div>

        <hr />

        {/* Readings */}
        <div className="readings">
          <p className="reading-title">READINGS</p>

          <div className="reading-item">
            <div className="icon-circle temperature-icon">
              <MdOutlineDeviceThermostat />
            </div>
            <span className="label">Temperature</span>
            <span className="value">{node.readings.temperature}</span>
          </div>

          <div className="reading-item ">
            <div className="icon-circle pressure-icon">
              <WiBarometer />
            </div>
            <span className="label">Pressure</span>
            <span className="value">{node.readings.pressure}</span>
          </div>

          <div className="reading-item">
            <div className="icon-circle volume-icon">
              <FiBox  />
            </div>
            <span className="label">Volume</span>
            <span className="value">{node.readings.volume}</span>
          </div>
        </div>

      </div>
    // </div>
  )
}

export default NodeDataCard
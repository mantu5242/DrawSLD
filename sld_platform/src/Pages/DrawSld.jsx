// import React, { useState } from "react";
// import { Stage, Layer } from "react-konva";
// import "./DrawSld.css";

// import BranchNode from "../Component/Symbols/BranchNode";
// import PrsNode from "../Component/Symbols/PrsNode";
// import ValveNode from "../Component/Symbols/ValveNode";
// import EsdvNode from "../Component/Symbols/EsdvNode";
// import SensorNode from "../Component/Symbols/SensorNode";

// const DrawSld = () => {
//   const [nodes, setNodes] = useState([]);

//   const addNode = (type) => {
//     const id = nodes.length + 1;
//     const newNode = { id, type, x: 200, y: 100 };
//     setNodes([...nodes, newNode]);
//   };

//   const renderNode = () => {
//     switch (nodes) {
//       case "BRANCH":
//         console.log("branch is clicked")
//         return <BranchNode x={200} y={100} selected={True} />;
//       case "VALVE":
//         return <ValveNode x={200} y={100} selected={True} />;
//       case "PRS":
//         return <EsdvNode x={200} y={100} selected={True} />
//       case "QPS":
//         return <PrsNode x={200} y={100} selected={True} />;
//       case "SENSOR":
//         return <SensorNode x={200} y={100} selected={True} />;
//       case "ESDV":
//         return <EsdvNode x={200} y={100} selected={True} />;
//     //   case "":
//     //     return <PrsNode x={200} y={100} selected={True} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="drawsldmain">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <label className="sidebar-title">Nodes</label>

//         {/* <div className="drawsldblock" onClick={() => addNode("BRANCH")}>Branch</div>
//         <div className="drawsldblock" onClick={() => addNode("VALVE")}>Valve</div>
//         <div className="drawsldblock" onClick={() => addNode("PRS")}>PRS</div>
//         <div className="drawsldblock" onClick={() => addNode("PRS")} >QPS</div>
//         <div className="drawsldblock" onClick={() => addNode("PRS")}>Sensor</div>
//         <div className="drawsldblock" onClick={() => addNode("PRS")}>ESDV</div> */}
//         <div className="drawsldblock" onClick={handleClick("PRS")} >QPS</div>
//       </div>

//       {/* Canvas */}
//       <div className="canvas">
//         <Stage width={window.innerWidth - 260} height={window.innerHeight}>
//           <Layer>{renderNode()}</Layer>
//         </Stage>
//       </div>
//     </div>
//   );
// };

// export default DrawSld;


import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import "./DrawSld.css";

import PrsNode from "../Component/Symbols/PrsNode";
import ValveNode from "../Component/Symbols/ValveNode";
import EsdvNode from "../Component/Symbols/EsdvNode";
import SensorNode from "../Component/Symbols/SensorNode";
import BranchNode from "../Component/Symbols/BranchNode"

const DrawSld = () => {
  const [nodes, setNodes] = useState([]);
  const renderNode = (node) => {
    switch (node.type) {
      case "PRS":
        return <PrsNode key={node.id} x={node.x} y={node.y} selected={true}/>;
      case "VALVE":
        return <ValveNode key={node.id} x={node.x} y={node.y} selected={true} />;
      case "ESDV":
        return <EsdvNode key={node.id} x={node.x} y={node.y} selected={true} />;
      case "SENSOR":
        return <SensorNode key={node.id} x={node.x} y={node.y} selected={true} />;
      case "BRANCH":
        return <BranchNode key={node.id} x={node.x} y={node.y} selected={true} />;
      case "QPS":
        return <QpsNode key={node.id} x={node.x} y={node.y} selected={true} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="drawsldmain">
     
      <div className="sidebar">
        <label className="sidebar-title">Nodes</label>
        <div className="drawsldblock" onClick={() => addNode("PRS")}>PRS</div>
        <div className="drawsldblock" onClick={() => addNode("BRANCH")}>Branch</div>
        <div className="drawsldblock" onClick={() => addNode("ESDV")}>ESDV</div>
        <div className="drawsldblock" onClick={() => addNode("SENSOR")}>Sensor</div>
        <div className="drawsldblock" onClick={() => addNode("VALVE")}>Valve</div>
      </div>

    
      <div className="canvas">
        <Stage width={window.innerWidth - 260} height={window.innerHeight}>
          <Layer>{nodes.map((node) => renderNode(node))}</Layer>
        </Stage>
      </div>
    </div>
  );
};

export default DrawSld;

  
// import PrsNode from "../../Component/Symbols/PrsNode";
// import ValveNode from "../../Component/Symbols/ValveNode";
// import EsdvNode from "../../Component/Symbols/EsdvNode";
// import SensorNode from "../../Component/Symbols/SensorNode";
// import BranchNode from "../../Component/Symbols/BranchNode";
// import QpsNode from "../../Component/Symbols/qpsNode";
// import ConsumerNode from "../Symbols/ConsumerNode";
// import GbNode from "../Symbols/GbNode";
// import ReducerNode from "../Symbols/ReducerNode";
// import RegulatorNode from "../Symbols/RegulatorNode";
// import StreetRegulatorNode from "../Symbols/StreetRegulatorNode";
// import MeterNode from "../Symbols/MeterNode";
// import JointNode from "../Symbols/JointNode";


// const NODE_MAP = {
//   PRS: PrsNode,
//   VALVE: ValveNode,
//   ESDV: EsdvNode,
//   SENSOR: SensorNode,
//   BRANCH: BranchNode,
//   QPS: QpsNode,
//   CONSUMER: ConsumerNode,
//   JOINT: JointNode,
//   STREETREGULATOR: StreetRegulatorNode,
//   REDUCER: ReducerNode,
//   REGULATOR: RegulatorNode,
//   METER: MeterNode,
//   GB: GbNode
// };

// const NodesRenderer = ({
//   nodes,
//   selected,
//   setSelected,
//   updateNode,
//   resizeNode,
//   shapeRefs,
//   // isDraggingNode,
//   setIsDraggingNode,
//   onStartConnect,
//   onFinishConnect
// }) =>
//   nodes.map(node => {
//     const Component = NODE_MAP[node.type];
//     if (!Component) return null;


//     return (
//       <Component
//         key={node.id}  
      
//         setIsDraggingNode = {setIsDraggingNode}
//         onStartConnect = {onStartConnect}
//         onFinishConnect = {onFinishConnect}
//         node={node}
//         selected={selected}
//         onDrag={updateNode}
//         onResize={resizeNode}
//         onSelect={(id) => setSelected({ type: "node", id })}
//         ref={(el) => (shapeRefs.current[node.id] = el)} 
//       />
//     );
//   });

// export default NodesRenderer;


import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../Redux/SelectionSlice";
import {
  updateNode,
  resizeNode
} from "../../Redux/DiagramSlice";

import PrsNode from "../../Component/Symbols/PrsNode";
import ValveNode from "../../Component/Symbols/ValveNode";
import EsdvNode from "../../Component/Symbols/EsdvNode";
import SensorNode from "../../Component/Symbols/SensorNode";
import BranchNode from "../../Component/Symbols/BranchNode";
import QpsNode from "../../Component/Symbols/qpsNode";
import ConsumerNode from "../Symbols/ConsumerNode";
import GbNode from "../Symbols/GbNode";
import ReducerNode from "../Symbols/ReducerNode";
import RegulatorNode from "../Symbols/RegulatorNode";
import StreetRegulatorNode from "../Symbols/StreetRegulatorNode";
import MeterNode from "../Symbols/MeterNode";
import JointNode from "../Symbols/JointNode";
import PressureNode from "../Symbols/PressureSensor";
import TemperatureSensor from "../Symbols/TemperatureSensor";

const NODE_MAP = {
  PRS: PrsNode,
  VALVE: ValveNode,
  ESDV: EsdvNode,
  SENSOR: SensorNode,
  BRANCH: BranchNode,
  QPS: QpsNode,
  CONSUMER: ConsumerNode,
  JOINT: JointNode,
  STREETREGULATOR: StreetRegulatorNode,
  REDUCER: ReducerNode,
  REGULATOR: RegulatorNode,
  METER: MeterNode,
  GB: GbNode,
  PRESSURESENSOR: PressureNode,
  TEMPERATURESENSOR: TemperatureSensor
};

const NodesRenderer = ({
  nodes,
  shapeRefs,
  setIsDraggingNode,
  onStartConnect,
  onFinishConnect
}) => {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.selection);

  return nodes.map(node => {
    const Component = NODE_MAP[node.type];
    if (!Component) return null;

    return (
      <Component
        key={node.id}
        node={node}
        selected={selected}
        setIsDraggingNode={setIsDraggingNode}
        onStartConnect={onStartConnect}
        onFinishConnect={onFinishConnect}

        onDrag={(id, x, y) =>
          dispatch(updateNode({ id, x, y }))
        }

        onResize={(id, x, y, width, height, radius) =>
          dispatch(
            resizeNode({
              id,
              x,
              y,
              width,
              height,
              radius
            })
          )
        }

        onSelect={(id) =>
          dispatch(setSelection({ type: "node", id }))
        }

        ref={(el) => (shapeRefs.current[node.id] = el)}
      />
    );
  });
};

export default NodesRenderer;
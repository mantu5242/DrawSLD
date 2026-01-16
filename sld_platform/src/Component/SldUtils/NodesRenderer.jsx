import PrsNode from "../../Component/Symbols/PrsNode";
import ValveNode from "../../Component/Symbols/ValveNode";
import EsdvNode from "../../Component/Symbols/EsdvNode";
import SensorNode from "../../Component/Symbols/SensorNode";
import BranchNode from "../../Component/Symbols/BranchNode";
import QpsNode from "../../Component/Symbols/qpsNode";
import ConsumerNode from "../Symbols/ConsumerNode";



const NODE_MAP = {
  PRS: PrsNode,
  VALVE: ValveNode,
  ESDV: EsdvNode,
  SENSOR: SensorNode,
  BRANCH: BranchNode,
  QPS: QpsNode,
  CONSUMER: ConsumerNode
};

const NodesRenderer = ({
  nodes,
  selected,
  setSelected,
  updateNode,
  resizeNode,
  shapeRefs,
  isDraggingNode,
  setIsDraggingNode
}) =>
  nodes.map(node => {
    const Component = NODE_MAP[node.type];
    if (!Component) return null;


    return (
      <Component
        key={node.id}  
      
        setIsDraggingNode = {setIsDraggingNode}
        node={node}
        selected={selected}
        onDrag={updateNode}
        onResize={resizeNode}
        onSelect={(id) => setSelected({ type: "node", id })}
        ref={(el) => (shapeRefs.current[node.id] = el)} 
      />
    );
  });

export default NodesRenderer;

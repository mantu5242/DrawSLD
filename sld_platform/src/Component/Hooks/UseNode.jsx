import { useDispatch, useSelector } from "react-redux";
import {
  addNode,
  updateNodePosition,
  resizeNode,
  removeNode
} from "../../store/diagramSlice";

export const useNodes = () => {
  const dispatch = useDispatch();

  const nodes = useSelector(state => state.diagram.nodes);


  const Node_def = {
    PRS: { width: 80, height: 50 },
    QPS: { width: 100, height: 50 },
    ESDV: { width: 60, height: 30 },
    CONSUMER: { width: 50, height: 40 },
    REGULATOR: { width: 60, height: 30 },
    STREETREGULATOR: { width: 60, height: 30 },
    REDUCER: { width: 60, height: 30 },
    METER: { width: 60, height: 45 },
    GB: { width: 60, height: 30 },
    BRANCH: { width: 30, height: 30 },
    VALVE: { width: 60, height: 30 },
    SENSOR: { width: 50, height: 30 },
    JOINT: { width: 30, height: 30 }
  };



  const handleAddNode = (type) => {
    const config = Node_def[type];
    if (!config) return;

    dispatch(
      addNode({
        type,
        x: 200,
        y: 100,
        config,
        readings: {
        temperature: 72,
        pressure: 14.7,
        volume: 250,
      }
      })
    );
  };


  const handleUpdateNode = (id, x, y) => {
    dispatch(updateNodePosition({ id, x, y }));
  };



  const handleResizeNode = (id, x, y, width, height, radius) => {
    dispatch(
      resizeNode({
        id,
        x,
        y,
        width,
        height,
        radius
      })
    );
  };



  const handleRemoveNode = (id) => {
    dispatch(removeNode(id));
  };

  return {
    nodes,
    addNode: handleAddNode,
    updateNode: handleUpdateNode,
    resizeNode: handleResizeNode,
    removeNode: handleRemoveNode
  };
};
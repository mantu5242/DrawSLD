import { useDispatch, useSelector } from "react-redux";
import {
  addArrow,
  addArrowFromPorts,
  updateArrowPort,
  updateArrowLabel,
  updateArrowColor,
  removeArrow
} from "../../Redux/DiagramSlice";

import { hitTestNode, getNodeCenter } from "../../Component/Utils/Geometry";
import { getCircleSnapPoint } from "../Utils/CircleSnap";
import { getSnapPoint } from "../Utils/RectSnap";

export const useArrow = () => {
  const dispatch = useDispatch();

  const arrows = useSelector(state => state.history.present.arrows);
  const nodes = useSelector(state => state.history.present.nodes);

  // add basic arrow 

  const handleAddArrow = () => {
    dispatch(addArrow());
  };

  // add arrow from port 

  const handleAddArrowFromPorts = (from, to) => {
    const fromNode = nodes.find(n => n.id === from.nodeId);
    // console.log("fromNode ",fromNode)
    const toNode = nodes.find(n => n.id === to.nodeId);
    // console.log("toNode", toNode);

    if (!fromNode || !toNode) return;

    const fromIndex = from.index ?? 0;
    const toIndex = to.index ?? 0;

    const startSnap = fromNode.radius
      ? getCircleSnapPoint(fromNode, fromNode.x, fromNode.y)
      : getSnapPoint(fromNode, from.side, fromIndex);

    const endSnap = toNode.radius
      ? getCircleSnapPoint(toNode, toNode.x, toNode.y)
      : getSnapPoint(toNode, to.side, toIndex);

    dispatch(
      addArrowFromPorts({
        start: {
          ...startSnap,
          attachedTo: {
            nodeId: from.nodeId,
            side: from.side,
            index: fromIndex
          }
        },
        end: {
          ...endSnap,
          attachedTo: {
            nodeId: to.nodeId,
            side: to.side,
            index: toIndex
          }
        }
      })
    );
  };

  // add arrow label 

  const handleUpdateArrowLabel = (arrowId, text) => {
    dispatch(updateArrowLabel({ arrowId, text }));
  };

  // updata arrow color 

  const handleUpdateArrowColor = (arrowId, color) => {
    dispatch(updateArrowColor({ arrowId, color }));
  };

    // port dragging 

  const handleUpdateArrowPort = (arrowId, port, x, y) => {
    const node = hitTestNode(nodes, x, y);

    if (!node) {
      dispatch(
        updateArrowPort({
          arrowId,
          port,
          data: { x, y, attachedTo: null }
        })
      );
      return;
    }

    const arrow = arrows.find(a => a.id === arrowId);
    if (!arrow) return;

    const otherPort = port === "start" ? "end" : "start";

    // Prevent self loop
    if (arrow[otherPort]?.attachedTo?.nodeId === node.id) return;

    /* -------- CIRCLE NODE -------- */
    if (node.radius) {
      const snap = getCircleSnapPoint(node, x, y);

      dispatch(
        updateArrowPort({
          arrowId,
          port,
          data: {
            ...snap,
            attachedTo: {
              nodeId: node.id
            }
          }
        })
      );
      return;
    }

    /* -------- RECT NODE -------- */
    const { x: cx, y: cy } = getNodeCenter(node);
    const dx = x - cx;
    const dy = y - cy;

    const side =
      Math.abs(dx) > Math.abs(dy)
        ? dx > 0
          ? "right"
          : "left"
        : dy > 0
        ? "bottom"
        : "top";

    const snap = getSnapPoint(node, side, 0);

    dispatch(
      updateArrowPort({
        arrowId,
        port,
        data: {
          ...snap,
          attachedTo: {
            nodeId: node.id,
            side,
            index: 0
          }
        }
      })
    );
  };

// delete arrow  

  const handleRemoveArrow = arrowId => {
    dispatch(removeArrow(arrowId));
  };

  return {
    arrows,
    addArrow: handleAddArrow,
    addArrowFromPorts: handleAddArrowFromPorts,
    updateArrowPort: handleUpdateArrowPort,
    updateArrowLabel: handleUpdateArrowLabel,
    updateArrowColor: handleUpdateArrowColor,
    removeArrow: handleRemoveArrow
  };
};
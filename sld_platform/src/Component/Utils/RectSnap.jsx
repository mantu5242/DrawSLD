import { getNodeBound } from "./Geometry";
const SIDE_OFFSET = 0;
export function getSnapPoint(node, side, index = 0){
  const bounds = getNodeBound(node);
  const spacing = SIDE_OFFSET; // distance between multiple ports

  switch (side) {
    case "left":
      return {
        x: bounds.left,
        y: bounds.top + bounds.height / 2 + (index * spacing) - ((spacing * (index)) / 2),
      };

    case "right":
      return {
        x: bounds.right,
        y: bounds.top + bounds.height / 2 + (index * spacing) - ((spacing * (index)) / 2)
      };
      

    case "top":
      return {
        x: bounds.left + bounds.width / 2 + (index * spacing) - ((spacing * (index)) / 2),
        y: bounds.top,
      };

    case "bottom":
      return {
        x: bounds.left + bounds.width / 2 + (index * spacing) - ((spacing * (index)) / 2),
        y: bounds.bottom,
      };

    default:
      return getNodeCenter(node);
  }
};

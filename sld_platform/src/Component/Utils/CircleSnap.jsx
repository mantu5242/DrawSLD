export function getCircleSnapPoint (node, x, y, index = 0, spacing = 14){
  const cx = node.x;
  const cy = node.y;
  const r = node.radius;

  const dx = x - cx;
  const dy = y - cy;

  let side;
  if (Math.abs(dx) > Math.abs(dy)) {
    side = dx > 0 ? "right" : "left";
  } else {
    side = dy > 0 ? "bottom" : "top";
  }

  // Base snap coordinates
  let snapX, snapY;

  switch (side) {
    case "right":
      snapX = cx + r;
      snapY = cy + index * spacing - ((spacing * index) / 2);
      break;
    case "left":
      snapX = cx - r;
      snapY = cy + index * spacing - ((spacing * index) / 2);
      break;
    case "top":
      snapX = cx + index * spacing - ((spacing * index) / 2);
      snapY = cy - r;
      break;
    case "bottom":
      snapX = cx + index * spacing - ((spacing * index) / 2);
      snapY = cy + r;
      break;
    default:
      snapX = cx;
      snapY = cy;
  }

  return { x: snapX, y: snapY, side };
};
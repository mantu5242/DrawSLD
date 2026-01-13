// components/utils/geometry.js

export const NODE_WIDTH = 100;
export const NODE_HEIGHT = 100;

export function getNearestBoundaryPoint(node, x, y) {

  const width = node.width || 100;
  const height = node.height || 100;

  const points = [
    { x: node.x, y: node.y + height / 2 },           // left
    { x: node.x + width, y: node.y + height / 2 },   // right
    { x: node.x + width / 2, y: node.y },            // top
    { x: node.x + width / 2, y: node.y + height }    // bottom
  ];

  return points.reduce((a, b) =>
    Math.hypot(a.x - x, a.y - y) <
    Math.hypot(b.x - x, b.y - y)
      ? a
      : b
  );
}

export function hitTestNode(nodes, x, y) {
  for (const node of nodes) {
    if 
    (
      x >= node.x &&
      x <= node.x + (node.width || 100) &&
      y >= node.y &&
      y <= node.y + (node.height || 100)
    )
    {
      return node;
    }
  }
  return null;
}

export function getMidPoint (points) {
  // const len = points.length / 2;

  const midIndex = Math.floor(points.length / 2);
  return {
    x: points[midIndex - 1],
    y: points[midIndex]
  };
}


export function getPointAtT(points, t){
  let total  = 0;
  const segments = [];
  for(let i=0;i<points.length - 2;i += 2){
    const x1 = points[i];
    const y1 = points[i+1];
    const x2 = points[i+2];
    const y2 = points[i+3];

    const len = Math.hypot(x2-x1, y2-y1);
    segments.push({x1,y1,x2,y2,len});
    total += len;
  }

  
  let dist = t * total;

  for (const s of segments) {
    if (dist <= s.len) {
      const r = dist / s.len;
      return {
        x: s.x1 + (s.x2 - s.x1) * r,
        y: s.y1 + (s.y2 - s.y1) * r
      };
    }
    dist -= s.len;
  }

  return {
    x: segments.at(-1).x2,
    y: segments.at(-1).y2
  };
}

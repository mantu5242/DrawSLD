// components/utils/geometry.js

export const NODE_WIDTH = 100;
export const NODE_HEIGHT = 100;

export function getNearestBoundaryPoint(node, x, y) {
  // const points = [
  //   { x: node.x, y: node.y + NODE_HEIGHT / 2 }, // left
  //   { x: node.x + NODE_WIDTH, y: node.y + NODE_HEIGHT / 2 }, // right
  //   { x: node.x + NODE_WIDTH / 2, y: node.y }, // top
  //   { x: node.x + NODE_WIDTH / 2, y: node.y + NODE_HEIGHT } // bottom
  // ];
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

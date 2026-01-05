// components/utils/geometry.js

export const NODE_WIDTH = 100;
export const NODE_HEIGHT = 100;

export function getNearestBoundaryPoint(node, x, y) {
  const points = [
    { x: node.x, y: node.y + NODE_HEIGHT / 2 }, // left
    { x: node.x + NODE_WIDTH, y: node.y + NODE_HEIGHT / 2 }, // right
    { x: node.x + NODE_WIDTH / 2, y: node.y }, // top
    { x: node.x + NODE_WIDTH / 2, y: node.y + NODE_HEIGHT } // bottom
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
    if (
      x >= node.x &&
      x <= node.x + NODE_WIDTH &&
      y >= node.y &&
      y <= node.y + NODE_HEIGHT
    ) {
      return node;
    }
  }
  return null;
}

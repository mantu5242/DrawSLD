import { Line } from "react-konva";

const BASE_GRID_SIZE = 40;

const GridLayer = ({
  width,
  height,
  scale,
  stagePos
}) => {
  const gridSize = BASE_GRID_SIZE;

  // Convert viewport to world coordinates
  const worldLeft   = -stagePos.x / scale;
  const worldTop    = -stagePos.y / scale;
  const worldRight  = worldLeft + width / scale;
  const worldBottom = worldTop + height / scale;

  // Snap grid start to gridSize
  const startX = Math.floor(worldLeft / gridSize) * gridSize;
  const startY = Math.floor(worldTop / gridSize) * gridSize;

  const lines = [];

  // Vertical lines
  for (let x = startX; x < worldRight; x += gridSize) {
    lines.push(
      <Line
        key={`v-${x}`}
        points={[x, worldTop, x, worldBottom]}
        stroke="#e5e7eb"
        strokeWidth={1 / scale}
      />
    );
  }

  // Horizontal lines
  for (let y = startY; y < worldBottom; y += gridSize) {
    lines.push(
      <Line
        key={`h-${y}`}
        points={[worldLeft, y, worldRight, y]}
        stroke="#e5e7eb"
        strokeWidth={1 / scale}
      />
    );
  }

  return <>{lines}</>;
};

export default GridLayer;

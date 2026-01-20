export const getOrthogonalPath = (start, end) => {
  if (!start || !end) return [];

  const points = [];
  points.push(start.x, start.y);

  const dx = Math.abs(end.x - start.x);
  const dy = Math.abs(end.y - start.y);
  const THRESHOLD = 10; // minimum distance to apply step

  // If nearly horizontal or vertical → straight line
  if (dx < THRESHOLD || dy < THRESHOLD) {
    points.push(end.x, end.y);
    return points;
  }

  // Horizontal-first or vertical-first based on start side
  if (start.attachedTo?.side === "left" || start.attachedTo?.side === "right") {
    // horizontal → vertical
    const midX = (start.x + end.x) / 2;
    points.push(midX, start.y); // horizontal move
    points.push(midX, end.y);   // vertical move
  } else {
    // vertical → horizontal
    const midY = (start.y + end.y) / 2;
    points.push(start.x, midY); // vertical move
    points.push(end.x, midY);   // horizontal move
  }

  points.push(end.x, end.y); // final point
  return points;
};

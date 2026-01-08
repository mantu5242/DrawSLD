import { useEffect } from "react";

/**
 * Handles Delete / Backspace keyboard actions
 * - Deletes selected node or edge
 * - Cleans up connected arrows automatically
 */
export const UseKeyDelete = (
  selected,
  removeNode,
  removeArrow,
  cleanupNodeArrows,
  clearSelection
) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Backspace" && e.key !== "Delete") return;
      if (!selected?.type || !selected?.id) return;

      if (selected.type === "node") {
        removeNode(selected.id);
        cleanupNodeArrows(selected.id);
      }

      if (selected.type === "edge") {
        removeArrow(selected.id);
      }

      clearSelection({ type: null, id: null });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selected,
    removeNode,
    removeArrow,
    cleanupNodeArrows,
    clearSelection
  ]);
};

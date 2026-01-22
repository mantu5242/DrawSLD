import PipeArrow from "../../Component/Symbols/PipeSymbols/PipeArrow";

const ArrowsRenderer = ({
  arrows,
  selected,
  setSelected,
  onDragPort,
  setEditingLabel,
  moveArrow
}) =>
  arrows.map(a => (
    <PipeArrow
      key={a.id}
      arrow={a}
      selected={selected}
      onSelect={(id) => setSelected({ type: "edge", id })}
      onDragPort={onDragPort}
      setEditingLabel={setEditingLabel}
      moveArrow = {moveArrow}
    />
  ));

export default ArrowsRenderer;

import PipeArrow from "../../Component/Symbols/PipeSymbols/PipeArrow";
// C:\Users\MantuKumar\Desktop\DrawSLD\sld_platform\src\Component\Symbols\PipeSymbols\PipeArrow.jsx
const ArrowsRenderer = ({
  arrows,
  selected,
  setSelected,
  onDragPort
}) =>
  arrows.map(a => (
    <PipeArrow
      key={a.id}
      arrow={a}
      selected={selected}
      onSelect={(id) => setSelected({ type: "edge", id })}
      onDragPort={onDragPort}
    />
  ));

export default ArrowsRenderer;

// import PipeArrow from "../../Component/Symbols/PipeSymbols/PipeArrow";

// const ArrowsRenderer = ({
//   arrows,
//   selected,
//   setSelected,
//   onDragPort,
//   setEditingLabel,
//   moveArrow
// }) =>
//   arrows.map(a => (
//     <PipeArrow
//       key={a.id}
//       arrow={a}
//       selected={selected}
//       onSelect={(id) => setSelected({ type: "edge", id })}
//       onDragPort={onDragPort}
//       setEditingLabel={setEditingLabel}
//       moveArrow = {moveArrow}
//     />
//   ));

// export default ArrowsRenderer;


import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../Redux/SelectionSlice";
import PipeArrow from "../../Component/Symbols/PipeSymbols/PipeArrow";

const ArrowsRenderer = ({
  arrows,
  onDragPort,
  setEditingLabel,
  moveArrow
}) => {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.selection);

  return arrows.map(a => (
    <PipeArrow
      key={a.id}
      arrow={a}
      selected={selected}
      onSelect={(id) =>
        dispatch(setSelected({ type: "edge", id }))
      }
      onDragPort={onDragPort}
      setEditingLabel={setEditingLabel}
      moveArrow={moveArrow}
    />
  ));
};

export default ArrowsRenderer;
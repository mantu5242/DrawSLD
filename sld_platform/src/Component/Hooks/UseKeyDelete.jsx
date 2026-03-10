import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNode, removeArrow } from "../../Redux/DiagramSlice";
import { clearSelected } from "../../Redux/SelectionSlice";

export const useKeyDelete = () => {
  const dispatch = useDispatch();
  // const entiresld = useSelector(state => state);
  // console.log(entiresld)
  const selected = useSelector(state => state.selection);
  // console.log(selected.id)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Backspace" && e.key !== "Delete") return;
      if (!selected?.type || !selected?.id) return;

      if (selected.type === "node") {
        dispatch(removeNode(selected.id));
      }

      if (selected.type === "edge") {

        dispatch(removeArrow(selected.id));
      }

      dispatch(clearSelected());
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, selected]);
};
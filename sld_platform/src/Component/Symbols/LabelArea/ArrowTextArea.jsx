import { useEffect, useRef } from "react";
import { getOrthogonalPath } from "../../Utils/OrthogonalPath";
import { getPointAtT } from "../../Utils/Geometry";

const ArrowTextarea = ({ arrow, stageRef, onDone }) => {
  const ref = useRef();

  useEffect(() => {
    const stageBox = stageRef.current.container().getBoundingClientRect();
    const points = getOrthogonalPath(arrow.start, arrow.end);
    const base = getPointAtT(points, arrow.label.t);

    ref.current.style.left =
      stageBox.left + base.x + arrow.label.offset.x - 40 + "px";
    ref.current.style.top =
      stageBox.top + base.y + arrow.label.offset.y - 10 + "px";

    ref.current.focus();
  }, [arrow, stageRef]);

  console.log("in textarea component", arrow)

  return (
    <textarea
      ref={ref}
      defaultValue={arrow.label.text}
      style={{
        position: "absolute",
        fontSize: "14px",
        width: "120px",
        height: "24px",
        border: "1px solid #1976d2",
        outline: "none",
        resize: "none"
      }}
      onBlur={(e) => {
        arrow.label.text = e.target.value;
        onDone();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          arrow.label.text = e.target.value;
          onDone();
        }
      }}
    />
  );
};

export default ArrowTextarea;

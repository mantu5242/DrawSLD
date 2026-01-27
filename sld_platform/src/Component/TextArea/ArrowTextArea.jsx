import React, { useRef, useState } from 'react'

const ArrowTextArea = ({editingLabel, setEditingLabel, commitLabelChange, stageRef}) => {
    if(!editingLabel || !stageRef.current) return null;

    // const stageRect = stageRef.current
    //     .cotainer()      // this return actual dom element where Konva render the canvas
    //     .getBoundingClientRect()  // it return the position and size of the element relative to the viewport


    return (
        <textarea
            autoFocus
            value={editingLabel.label.text}
            onChange={(e) => {
            const str = e.target.value;
            setEditingLabel(prev => ({
                ...prev,
                label: {...prev, text: str}
            }))
            console.log(editingLabel.label.text);
            }}
            onBlur={commitLabelChange}
            onKeyDown={(e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                // setEditingLabel(null);
                commitLabelChange();
            }
            }}
            style={{
            position: "absolute",
            left:
                stageRef.current.container().getBoundingClientRect().left +
                editingLabel.labelScreenPos.x,
            top:
                stageRef.current.container().getBoundingClientRect().top +
                editingLabel.labelScreenPos.y,
            fontSize: "14px",
            padding: "4px",
            border: "1px solid #000000",
            outline: "none",
            background: "white",
            zIndex: 10
            }}
        />
    )
}

export default ArrowTextArea
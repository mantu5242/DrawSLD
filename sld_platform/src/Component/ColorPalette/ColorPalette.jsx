import React, { useState, useRef, useEffect } from "react";
import "./ColorPalette.css";

const defaultPalette = ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']

const ColorPalette = ({ initialColor, onApply, onClose }) => {
  const [color, setColor] = useState(initialColor);
  const popRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popRef.current && !popRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleHexChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("#")) value = "#" + value;
    setColor(value);
  };

  return (
    <div className="color-popover" ref={popRef}>
      <div className="color-preview">
        <div
          className="color-display"
          style={{ backgroundColor: color }}
        />
      </div>

      <div className="hex-section">
        <input
          type="text"
          value={color}
          onChange={handleHexChange}
          className="hex-input"
        />
      </div>

      <div className="palette-grid">
        {defaultPalette.map((c) => (
          <div
            key={c}
            className="palette-cell"
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>

      <div className="button-row">
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button
          className="apply-btn"
          onClick={() => onApply(color)}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ColorPalette;
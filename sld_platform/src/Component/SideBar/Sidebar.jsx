import { LuSearch } from 'react-icons/lu';
import './Sidebar.css'
import ObjectListDropdown from './ObjectListDropdown';

const colors = ["#000000", "#ff0000", "#00aaff", "#2ecc71", "#f39c12"];

const Sidebar = ({ addNode, addArrow, selected, onEdgeColorChange }) => (

  <div className="sidebar">
    <div className='sidebar-upperbox'>
      <div className="sidebar-title">Components</div>
      <div className='sidebar-search-container'>
        <LuSearch className='search-icon' style={{color:"rgba(57, 57, 57, 0.564)"}}/>
        <input className='sidebar-search-engine' type='text' placeholder='Search nodes...'></input>
      </div>
    </div>
    <div className='sidebar-midbox'>
      <ObjectListDropdown addNode={addNode} addArrow={addArrow}/>
    </div>
    

    {/* <label className="sidebar-title">Pipes</label>
    <div className="drawsldblock" onClick={addArrow}>
      Arrow
    </div> */}
{/*
    <label className="sidebar-title">Edge Color</label>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {colors.map(color => (
        <div
          key={color}
          onClick={() => {
            if (selected?.type === "edge") {
              onEdgeColorChange(color);
            }
          }}
          style={{
            width: 22,
            height: 22,
            background: color,
            cursor: selected?.type === "edge" ? "pointer" : "not-allowed",
            borderRadius: 4,
            border: selected?.type === "edge" ? "1px solid #333" : "1px solid #999",
            opacity: selected?.type === "edge" ? 1 : 0.5
          }}
        />
      ))}
    </div> */}
  </div>
);

export default Sidebar;

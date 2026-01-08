import './Sidebar.css'

const Sidebar = ({ addNode, addArrow }) => (
  <div className="sidebar">
    <label className="sidebar-title">Nodes</label>

    {["BRANCH","CONSUMER", "ESDV", "PRS", "QPS", "SENSOR", "VALVE"].map(type => (
      <div
        key={type}
        className="drawsldblock"
        onClick={() => addNode(type)}
      >
        {type}
      </div>
    ))}

    <label className="sidebar-title">Pipes</label>
    <div className="drawsldblock" onClick={addArrow}>
      Arrow
    </div>
  </div>
);

export default Sidebar;

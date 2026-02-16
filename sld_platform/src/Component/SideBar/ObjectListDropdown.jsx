// import { useState } from "react";
// import { LuChevronDown, LuChevronRight } from "react-icons/lu";
// import "./ObjectListDropdown.css";

// const ObjectListDropdown = ({ addNode }) => {
//   const [openMeasurement, setOpenMeasurement] = useState(true);
//   const [openStorage, setOpenStorage] = useState(true);
//   const [openController, setOpenController] = useState(true);
//   const [openInfrastructure, setOpenInfrastructure] = useState(true);

//   const Measurements = ["QPS", "METER", "SENSOR"];
//   const Storage = ["GB"];
//   const Controller = ["PRS", "ESDV", "REGULATOR", "REDUCER","STREETREGULATOR", "VALVE"];
//   const Infrastructure = ["PIPE"]

//   return (
//     <div className="sidebar-section">
      
//       {/* Header */}
//       <div 
//         className="sidebar-section-header"
//         onClick={() => setOpenMeasurement(!openMeasurement)}
//       >
//         {openMeasurement ? <LuChevronDown size={18}/> : <LuChevronRight size={18}/>}
//         <span>Measurement</span>
//       </div>

//       {/* Dropdown Content */}
//       <div className={`sidebar-section-content ${open ? "open" : ""}`}>
//         {Measurements.map(type => (
//           <div
//             key={type}
//             className="drawsldblock"
//             onClick={() => addNode(type)}
//           >
//             {type}
//           </div>
//         ))}
//       </div>

//       <div 
//         className="sidebar-section-header"
//         onClick={() => setOpen(!openStorage)}
//       >
//         {open ? <LuChevronDown size={18}/> : <LuChevronRight size={18}/>}
//         <span>Storage</span>
//       </div>

//       {/* Dropdown Content */}
//       <div className={`sidebar-section-content ${open ? "open" : ""}`}>
//         {Storage.map(type => (
//           <div
//             key={type}
//             className="drawsldblock"
//             onClick={() => addNode(type)}
//           >
//             {type}
//           </div>
//         ))}
//       </div>

//       <div 
//         className="sidebar-section-header"
//         onClick={() => setOpen(!openController)}
//       >
//         {open ? <LuChevronDown size={18}/> : <LuChevronRight size={18}/>}
//         <span>Controllers</span>
//       </div>

//       {/* Dropdown Content */}
//       <div className={`sidebar-section-content ${open ? "open" : ""}`}>
//         {Controller.map(type => (
//           <div
//             key={type}
//             className="drawsldblock"
//             onClick={() => addNode(type)}
//           >
//             {type}
//           </div>
//         ))}
//       </div>

//       <div 
//         className="sidebar-section-header"
//         onClick={() => setOpen(!openInfrastructure)}
//       >
//         {open ? <LuChevronDown size={18}/> : <LuChevronRight size={18}/>}
//         <span>Infrastructure</span>
//       </div>

//       {/* Dropdown Content */}
//       <div className={`sidebar-section-content ${open ? "open" : ""}`}>
//         {Infrastructure.map(type => (
//           <div
//             key={type}
//             className="drawsldblock"
//             onClick={() => addNode(type)}
//           >
//             {type}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ObjectListDropdown;


import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import "./ObjectListDropdown.css";

const SIDEBAR_SECTIONS = [
  {
    title: "Measurement",
    items: ["QPS", "METER", "SENSOR"]
  },
  {
    title: "Storage",
    items: ["GB"]
  },
  {
    title: "Controllers",
    items: ["PRS", "ESDV", "REGULATOR", "REDUCER", "STREETREGULATOR", "VALVE"]
  },
  {
    title: "Infrastructure",
    items: ["PIPE"]
  }
];

const ObjectListDropdown = ({ addNode, addArrow }) => {

  const [openSections, setOpenSections] = useState(() =>
    SIDEBAR_SECTIONS.reduce((acc, section) => {
      acc[section.title] = true; // default open
      return acc;
    }, {})
  );

  const toggleSection = (title) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="sidebar-section">

      {SIDEBAR_SECTIONS.map(({ title, items }) => (
        <div key={title} className="sidebar-accordion">

          {/* Header */}
          <div
            className="sidebar-section-header"
            onClick={() => toggleSection(title)}
          >
            {openSections[title]
              ? <LuChevronDown size={18} />
              : <LuChevronRight size={18} />
            }
            <span>{title}</span>
          </div>

          {/* Content */}
          <div
            className={`sidebar-section-content ${
              openSections[title] ? "open" : ""
            }`}
          >
            {items.map(type => (
              <div
                key={type}
                className="drawsldblock"
                onClick={() => addNode(type)}
              >
                {type}
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  );
};

export default ObjectListDropdown;


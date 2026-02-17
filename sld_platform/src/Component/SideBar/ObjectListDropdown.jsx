import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import "./ObjectListDropdown.css";
import qps from '../../assets/qps.png'
import meter from '../../assets/meter.png'
import strtRegulator from '../../assets/strtRegulator.png'
import branch from '../../assets/branch.png'
import consumer from '../../assets/consumer.png'
import arrow from '../../assets/arrow.png'
import reducer from '../../assets/reducer.png'
import valve from '../../assets/valve.png'
import gb from '../../assets/gb.png'
import sensor from '../../assets/sensor.png'
import prs from '../../assets/prs.png'
import regulator from '../../assets/regulator.png'



const SIDEBAR_SECTIONS = [
  {
    title: "Measurement",
    items: [
      { type: "QPS", image: qps },
      { type: "METER", image: meter },
      { type: "SENSOR", image: sensor }
    ]
  },
  {
    title: "Storage",
    items: [
      { type: "GB", image: gb }
    ]
  },
  {
    title: "Controllers",
    items: [
      { type: "PRS", image: prs },
      // { type: "ESDV", image: "" },
      { type: "REGULATOR", image: regulator },
      { type: "REDUCER", image: reducer },
      { type: "STREETREGULATOR", image: strtRegulator },
      { type: "VALVE", image: valve },
      { type: "JOINT", image: branch}
    ]
  },
  {
    title: "Infrastructure",
    items: [
      // { type: "PIPE", image: arrow }
      {type: "CONSUMER", image: consumer}
    ]
  
  },
  {
    title: "Connection-type",
    items: [
      {type: "EDGE", image: arrow}
    ]
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
            {items.map((item) => (
              <div
                key={item.type}
                className="drawsldblock"
                onClick={() => {
                  if(item.type !== "EDGE") addNode(item.type);
                  else addArrow();
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <img
                  src={item.image}
                  alt={item.type}
                  style={{ height: '4vh' }}
                />
                {item.type}
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  );
};

export default ObjectListDropdown;


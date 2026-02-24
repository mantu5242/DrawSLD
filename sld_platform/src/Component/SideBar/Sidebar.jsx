import { LuSearch } from 'react-icons/lu';
import './Sidebar.css'
import ObjectListDropdown from './ObjectListDropdown';
import { addArrow, addNode} from '../../Redux/DiagramSlice';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.selection);

  return (
  <div className="sidebar">
    <div className='sidebar-upperbox'>
      <div className="sidebar-title">Components</div>
      <div className='sidebar-search-container'>
        <LuSearch className='search-icon' style={{color:"rgba(57, 57, 57, 0.564)"}}/>
        <input className='sidebar-search-engine' type='text' placeholder='Search nodes...'></input>
      </div>
    </div>
    <div className='sidebar-midbox'>
      <ObjectListDropdown addNode={(payload) => dispatch(addNode(payload))} addArrow={() => dispatch(addArrow())}/>
    </div>
  </div>
  )
};

export default Sidebar;

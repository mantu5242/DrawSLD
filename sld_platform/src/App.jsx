import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import DrawSld from './Pages/DrawSld'
import NavBar from './Component/NavBar/NavBar';
import ViewPage from './Pages/ViewPage';
import {useState, useRef} from 'react'
function App() {
  const [scale, setScale] = useState(1);
  const stageRef = useRef(null)
  return (
   <BrowserRouter>
    <div className='Main-Layout'>
      <NavBar scale = {scale} setScale = {setScale}  />
      <Routes>
        <Route path='/' element = { <DrawSld scale = {scale} setScale = {setScale} stageRef={stageRef} /> }/>   
        <Route path='/view' element = { <ViewPage scale = {scale} setScale = {setScale}  stageRef = {stageRef}/> }/>    
      </Routes>
    </div>
    </BrowserRouter>
   )
}
export default App

import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import QpsNode from './Component/Symbols/QpsNode'
import PrsNode from './Component/Symbols/PrsNode' 
import BranchNode from './Component/Symbols/BranchNode'
import DrawSld from './Pages/DrawSld'
import SimpleConnect from './Pages/SimpleConnect'


function App() {


  return (
    <> 
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<PrsNode x={100} y={100} selected={true}/>}/> */}
        {/* <Route path='/' element = {<QpsNode x={100} y={100} selected={true}/>}/> */}
        {/* <Route path='/' element={<BranchNode x={100} y={100} selected={true}/>}/> */}
        <Route path='/' element = { <DrawSld/> }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react'
import DrawSld from './Pages/DrawSld'
import ViewPage from './Pages/ViewPage';
import SldStage from './Component/SldUtils/SldStage';


function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element = { <DrawSld/> }/>       
        {/* <Route path='/' element = {<ColorPalette/>}/> */}
        <Route path='/view' element = { <SldStage/> } />
      </Routes>
    </BrowserRouter>
   )
}

export default App

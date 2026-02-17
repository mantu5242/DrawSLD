import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react'
import DrawSld from './Pages/DrawSld'


function App() {


  return (
    <React.StrictMode className="mainBlock-project"> 
    {/* <NavBar/> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <DrawSld/> }/>       
        {/* <Route path='/' element = {<ColorPalette/>}/> */}
      </Routes>
    </BrowserRouter>
    </React.StrictMode>
  )
}

export default App

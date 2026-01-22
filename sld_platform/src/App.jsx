import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import DrawSld from './Pages/DrawSld'
import NavBar from './Component/NavBar/NavBar'


function App() {


  return (
    <React.StrictMode> 
    <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <DrawSld/> }/>       
      </Routes>
    </BrowserRouter>
    </React.StrictMode>
  )
}

export default App

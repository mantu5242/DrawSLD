import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DrawSld from './Pages/DrawSld'
import NavBar from './Component/NavBar/NavBar'


function App() {


  return (
    <> 
    {/* <NavBar/> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <DrawSld/> }/>       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

import { useState } from 'react'


import Navbar from './components/Navbar';
import Create from './components/Create';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Read from './components/Read';
import Edit from './components/Edit';
import './App.css'

function App() {

  return (
<>
<BrowserRouter> 
<Navbar/>
<Routes>
  <Route exact path="/create" element={<Create/>}/>
  <Route exact path="/" element={<Read/>}/>
  <Route exact path="/edit/:id" element={<Edit/>}/>


</Routes>
</BrowserRouter>

</>  )
}

export default App

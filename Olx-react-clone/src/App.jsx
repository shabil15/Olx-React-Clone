import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from './Components/Auth/Auth';
import Header from './Components/Header/Header';
  


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element ={<Auth/>}/> 
        </Routes>
      </Router>
    </div>
  )
}

export default App

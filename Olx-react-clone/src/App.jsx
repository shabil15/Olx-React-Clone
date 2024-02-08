import { useState } from 'react'
import './App.css'
import Auth from './Components/Auth/Auth';
import Layout from './Components/Layout'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sell from './Components/Sell/Sell';
import Products from './Components/Products/Products';  


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Products /></Layout>} />
          <Route path="/login" element ={<Auth/>}/> 
          <Route path='/sell' element={<Sell/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

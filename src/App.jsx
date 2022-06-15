import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Login from './pages/Login';
import NewUser from './pages/NewUser';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/newUser" element={<NewUser />} />
      </Routes>
    </Router>
  )
}

export default App

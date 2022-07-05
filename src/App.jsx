import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import NewProject from './pages/newProject';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/newProject" element={<NewProject />} />
      </Routes>
    </Router>
  )
}

export default App

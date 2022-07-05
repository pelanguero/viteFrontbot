import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import NewProject from './pages/newProject';
import ViewQuestions from './pages/ViewQuestions';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/newProject" element={<NewProject />} />
        <Route path="/questions" element={<ViewQuestions />} />
      </Routes>
    </Router>
  )
}

export default App

import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Main from './components/Main/Main';

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

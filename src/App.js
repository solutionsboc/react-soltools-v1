import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MmCustomizer from './pages/MMCUSTOMIZER/MmCustomizer';
import Ideas from './pages/Ideas';
import Moi from './pages/MOI/Moi';
import APIquery from './pages/APIQUERY/APIquery';
import Team from './pages/Team';
import About from './pages/About';

function App() {
  return (
    <>
      <Router basename='/react-soltools-v1'>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/MMCUSTOMIZER/mmcustomizer' element={<MmCustomizer />} />
          <Route path='/ideas' element={<Ideas />} />
          <Route path='/MOI/moi' element={<Moi />} />
          <Route path='/APIQUERY/apiquery' element={<APIquery />} />
          {/* <Route path='/team' element={<Team />} /> */}
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

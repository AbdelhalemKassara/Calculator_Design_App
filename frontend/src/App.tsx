import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import BracketsCalculator from './Pages/BracketsCalculator';
import InfixCalculator from './Pages/InfixCalculator/InfixCalculator';
import RPNCalculator from './Pages/RPNCalculator';

function App() {
  return (
      <div className="App">
        <Header/>
          <Routes>
            <Route path="/" element={<Navigate replace to="/infix" />} />
            <Route path="/infix" element={<InfixCalculator />}/>
            <Route path="/brackets" element={<BracketsCalculator />}/>
            <Route path="/rpn" element={<RPNCalculator />}/>
          </Routes>
        </div>
  );
}

export default App;

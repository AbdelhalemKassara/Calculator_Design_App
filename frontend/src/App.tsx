import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import BracketsCalculator from './Pages/BracketsCalculator/BracketsCalculator';
import InfixCalculator from './Pages/InfixCalculator/InfixCalculator';
import RPNCalculator from './Pages/RPNCalculator/RPNCalculator';

function App() {
  const [userName, setUserName] = useState<string>('');

  return (
      <div className="App">
        <Header setUserName={setUserName}/>
          <Routes>
            <Route path="/" element={<Navigate replace to="/infix" />} />
            <Route path="/infix" element={<InfixCalculator userName={userName}/>}/>
            <Route path="/brackets" element={<BracketsCalculator userName={userName}/>}/>
            <Route path="/rpn" element={<RPNCalculator userName={userName}/>}/>
          </Routes>
        </div>
  );
}

export default App;

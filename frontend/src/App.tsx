import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import PageButtons from './components/PageButtons/PageButtons';
import BracketsCalculator from './Pages/BracketsCalculator';
import InfixCalculator from './Pages/InfixCalculator';
import RPNCalculator from './Pages/RPNCalculator';

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path="/infix" element={<InfixCalculator />}/>
          <Route path="/brackets" element={<BracketsCalculator />}/>
          <Route path="/rpn" element={<RPNCalculator />}/>
        </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataDisplay from './components/DataDisplay';
import MakeAction from './components/MakeAction';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataDisplay />} />
        <Route path="/make-action" element={<MakeAction />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


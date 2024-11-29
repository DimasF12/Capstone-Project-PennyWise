import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main/main';
import KalkulatorInvestasi from './components/kalkulator/KalkulatorInvestasi';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route ke halaman utama */}
          <Route path="/" element={<Main username="User" />} />

          {/* Route ke halaman kalkulator investasi */}
          <Route path="/kalkulator/KalkulatorInvestasi" element={<KalkulatorInvestasi username="User" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

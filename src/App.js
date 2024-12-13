import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main/main';
import KalkulatorInvestasi from './components/kalkulator/KalkulatorInvestasi';
import Perencanaan from './components/perencanaan/Perencanaan';
import TrackingKeuangan from './components/tracking/TrackingKeuangan';
import HasilStrategi from './components/kalkulator/HasilStrategi';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route ke halaman utama */}
          <Route path="/" element={<Main username="User" />} />

          {/* Route ke halaman kalkulator investasi */}
          <Route path="/kalkulator/KalkulatorInvestasi" element={<KalkulatorInvestasi username="User" />} />

          {/* Route ke halaman perencanaan */}
          <Route path="/perencanaan/Perencanaan" element={<Perencanaan username="User" />} />

          {/* Route ke halaman tracking keuangan */}
          <Route path="/tracking/TrackingKeuangan" element={<TrackingKeuangan username="User" />} />

          {/* Route ke halaman hasil strategi */}
          <Route path="/kalkulator/HasilStrategi" element={<HasilStrategi username="User" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

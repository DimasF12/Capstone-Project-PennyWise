import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main/main';
import KalkulatorInvestasi from './components/kalkulator/KalkulatorInvestasi';
import Perencanaan from './components/perencanaan/Perencanaan';
import TrackingKeuangan from './components/tracking/TrackingKeuangan';
import HasilStrategi from './components/hasil/HasilStrategi';
import BarangImpian from './components/perencanaan/barangimpian/BarangImpian' ;
import HasilBarangImpian from './components/perencanaan/barangimpian/hasilbarang/HasilBarangImpian';
import DanaDarurat from './components/perencanaan/danadarurat/DanaDarurat' ;
import HitungDanaDarurat from './components/perencanaan/danadarurat/HitungDana/HitungDanaDarurat';

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
          <Route path="/hasil/HasilStrategi" element={<HasilStrategi username="User" />} />

          {/* Route ke halaman barang impian */}
           <Route path="/BarangImpian" element={<BarangImpian />} username="User" /> 

           {/* Route ke halaman hasil barang impian */}
           <Route path="/hasilBarang/HasilBarangImpian" element={<HasilBarangImpian />} username="User" /> 

           {/* Route ke halaman dana darurat */}
           <Route path="/DanaDarurat" element={<DanaDarurat />} username="User" />

           {/* Route ke halaman hitung barang impian */}
           <Route path="/HitungDana/HitungDanaDarurat" element={<HitungDanaDarurat/>} username="User" /> 
             
        </Routes>
      </div>
    </Router>
  );
};

export default App;

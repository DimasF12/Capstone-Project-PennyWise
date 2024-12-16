import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import './HasilStrategi.css';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faMoneyBillWave, faChartLine, faClock, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const HasilStrategi = () => {
  const location = useLocation();
  
  // State for managing the expanded/collapsed state
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(true);

  // Retrieve data from state with default values
  const {
    totalUangDibutuhkan = 0,
    uangSaatIni = 0,
    jumlahInvestasiBulanan = 0,
    returnInvestasi = 0,
    lamaInvestasi = 0,
    hasilInvestasi = 0,
  } = location.state?.hasil || {}; // Optional chaining to avoid errors if state is not available

  // Function to format numbers with thousand separators
  const formatNumber = (value) => {
    if (value === null || value === undefined) return '0';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Check if results are available
  useEffect(() => {
    if (hasilInvestasi < totalUangDibutuhkan) {
      setIsSuccessful(false);
    }
  }, [hasilInvestasi, totalUangDibutuhkan]);

  // Function to toggle the expanded state
  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  // Handle the case where no data is available
  if (!location.state || !location.state.hasil) {
    return <div>No data available for investment strategy results.</div>;
  }

  return (
    <div className="hasil-strategi-container">
      {/* Navigation Bar */}
      <div className="nav-container-hasilprediksi">
        <Link to="../" className="back-button">Back</Link>
        <div className="nav-title-hasilprediksi">
          <FontAwesomeIcon icon={faCalculator} className="calculator-icon" />
          <div className="title-text-hasilprediksi">Hasil Strategi Investasi</div>
        </div>
      </div>

      {/* Header Section */}
      <div className={`header-container-hasil ${isSuccessful ? 'success' : 'error'}`}>
        {isSuccessful ? (
          <div className="success-message">Strateginya cocok untuk mencapai mimpimu! 😃🎉</div>
        ) : (
          <div className="error-message">Strategi gagal! Hasil investasi tidak mencukupi.</div>
        )}
        <div className="profile-icon"></div>
      </div>

      {/* Result Message Display */}
      <div className="hasil-detail">
        <div className="hasil-detail-top">
          <h2>Total Uang yang Kamu Butuhkan</h2>
          <p className="amount">Rp {formatNumber(totalUangDibutuhkan)}</p>
        </div>

        <div className="hasil-detail-toggle" onClick={toggleDetails}>
          <h3>Detail Investasi</h3>
          <span>{isExpanded ? '▲' : '▼'}</span>
        </div>

        {isExpanded && (
          <div className="hasil-detail-down">
            <p><FontAwesomeIcon icon={faDollarSign} /> Uangmu saat ini: Rp {formatNumber(uangSaatIni)}</p>
            <p><FontAwesomeIcon icon={faMoneyBillWave} /> Jumlah Investasi/bulan: Rp {formatNumber(jumlahInvestasiBulanan)}</p>
            <p><FontAwesomeIcon icon={faChartLine} /> Return investasi: {returnInvestasi}%/Tahun</p>
            <p><FontAwesomeIcon icon={faClock} /> Lama investasi: {lamaInvestasi} Tahun</p>
            <p><FontAwesomeIcon icon={faMoneyBillWave} /> Hasil Investasi: Rp {formatNumber(hasilInvestasi)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HasilStrategi;

import React, { useState, useEffect } from 'react';
import './HitungDanaDarurat.css';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faMoneyBillWave, faChartLine, faClock, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const HitungDanaDarurat = () => {
  const location = useLocation();
  const { hasil } = location.state || {};

  // State for managing the expanded/collapsed state
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(true);

  // Ensure 'hasil' is available before attempting to access it
  useEffect(() => {
    if (hasil) {
      const { fundShortage } = hasil;
      setIsSuccessful(fundShortage === 0); // If there's no shortage, the strategy is successful
    }
  }, [hasil]);

  // Function to format numbers with thousand separators
  const formatNumber = (value) => {
    if (value === null || value === undefined) return '0';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Function to toggle the expanded state
  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  // Show a loading or error message if 'hasil' is unavailable
  if (!hasil) {
    return (
      <div className="error-message">
        <p>Data tidak tersedia. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  // Use 'hasil' data to display
  const {
    requiredFund,
    currentFund,
    fundShortage,
    monthlyInvestment,
    investmentReturn,
    durationTarget,
  } = hasil;

  return (
    <div className="hasil-strategi-container">
      {/* Navigation Bar */}
      <header className="nav-container">
        <Link to="../" className="back-button">Back</Link>
        <div className="nav-title">
          <FontAwesomeIcon icon={faCalculator} className="calculator-icon" />
          <div className="title-text">Hitung Dana Darurat</div>
        </div>
      </header>

      {/* Header Section */}
      <section className={`header-container ${isSuccessful ? 'success' : 'error'}`}>
        {isSuccessful ? (
          <div className="success-message">Strategi dana daruratmu berhasil! 😃🎉</div>
        ) : (
          <div className="error-message">Dana darurat belum mencukupi, masih ada kekurangan.</div>
        )}
        <div className="profile-icon"></div>
      </section>

      {/* Result Message Display */}
      <section className="hasil-detail">
        <div className="hasil-detail-top">
          <h2>Total Dana yang Diperlukan</h2>
          <p className="amount">Rp {formatNumber(requiredFund)}</p>
        </div>

        <div className="hasil-detail-toggle" onClick={toggleDetails}>
          <h3>Detail Dana Darurat</h3>
          <span>{isExpanded ? '▲' : '▼'}</span>
        </div>

        {isExpanded && (
          <div className="hasil-detail-down">
            <p><FontAwesomeIcon icon={faDollarSign} /> Dana Darurat Saat Ini: Rp {formatNumber(currentFund)}</p>
            <p><FontAwesomeIcon icon={faMoneyBillWave} /> Kekurangan Dana Darurat: Rp {formatNumber(fundShortage)}</p>
            <p><FontAwesomeIcon icon={faChartLine} /> Investasi Bulanan: Rp {formatNumber(monthlyInvestment)}</p>
            <p><FontAwesomeIcon icon={faClock} /> Lama Target: {durationTarget} Bulan</p>
            <p><FontAwesomeIcon icon={faMoneyBillWave} /> Return Investasi: {investmentReturn}% per Tahun</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HitungDanaDarurat;

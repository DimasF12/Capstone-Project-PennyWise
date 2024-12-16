import React, { useState, useEffect } from 'react';
import './HasilBarangImpian.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faMoneyBillWave, faChartLine, faClock, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const HasilBarangImpian = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasil } = location.state || {};

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [selisih, setSelisih] = useState(0);

  useEffect(() => {
    if (hasil) {
      const { totalUangDibutuhkan = 0, hasilInvestasi = 0 } = hasil;
      const calculatedSelisih = hasilInvestasi - totalUangDibutuhkan;
      setSelisih(calculatedSelisih);
      setIsSuccessful(calculatedSelisih >= 0);
    } else {
      navigate('../'); // Redirect if no data available
    }
  }, [hasil, navigate]);

  const formatNumber = (value) => {
    if (value === null || value === undefined) return '0';
    return parseFloat(value)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const toggleDetails = () => setIsExpanded((prev) => !prev);

  if (!hasil) {
    return <div>No data available. Please go back and try again.</div>;
  }

  const {
    totalUangDibutuhkan = 0,
    uangSaatIni = 0,
    targetInvestasi = 0,
    returnInvestasi = 0,
    lamaInvestasi = 0,
    hasilInvestasi = 0,
  } = hasil;

  const detailData = [
    { label: 'Uangmu saat ini', value: uangSaatIni, icon: faDollarSign },
    { label: 'Target Investasi/bulan', value: targetInvestasi, icon: faMoneyBillWave },
    { label: 'Return investasi', value: `${returnInvestasi}%/Tahun`, icon: faChartLine },
    { label: 'Lama investasi', value: `${lamaInvestasi} Bulan`, icon: faClock },
    { label: 'Hasil Investasi', value: hasilInvestasi, icon: faMoneyBillWave },
  ];

  return (
    <div className="hasil-strategi-container">
      {/* Navigation Bar */}
      <div className="nav-container">
        <Link to="../" className="back-button">Back</Link>
        <div className="nav-title">
          <FontAwesomeIcon icon={faCalculator} className="calculator-icon" />
          <div className="title-text">Hasil Barang Impian</div>
        </div>
      </div>

      {/* Header Section */}
      <div className={`header-container ${isSuccessful ? 'success' : 'error'}`}>
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
          <h2>Total Uang yang Kamu Perlukan untuk Mencapai harga barang impian mu</h2>
          <p className="amount">Rp {formatNumber(totalUangDibutuhkan)}</p>
          <h2> Selisih </h2>
          <p className="amount"> Rp {formatNumber(selisih)}</p>
        </div>

        {/* Toggle for Detailed View */}
        <div className="hasil-detail-toggle" onClick={toggleDetails}>
          <h3>Detail Investasi</h3>
          <span>{isExpanded ? '▲' : '▼'}</span>
        </div>

        {isExpanded && (
          <div className="hasil-detail-down">
            {detailData.map((detail, index) => (
              <p key={index}>
                <FontAwesomeIcon icon={detail.icon} /> {detail.label}:{' '}
                {detail.label === 'Return investasi' || detail.label === 'Lama investasi'
                  ? detail.value
                  : `Rp ${formatNumber(detail.value)}`}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HasilBarangImpian;

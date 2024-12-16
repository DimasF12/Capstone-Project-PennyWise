import React from 'react';
import './main.css';
import { Link } from 'react-router-dom'; // pastikan Link diimpor dengan benar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons'; 
import { faMagnifyingGlassDollar } from '@fortawesome/free-solid-svg-icons'; 
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'; 

const Main = ({ username }) => {
  return (
    <div className="main-container">
      {/* Header Section */}
      <div className="header-container">
        <div className="profile-icon"></div>
        <div className="greeting-text">Hi, {username}</div>
        <div className="company-name">Pennywise</div>
        <div className="tagline">Manage Your Finances Easily</div>
      </div>

      <div className="section-title">Apa yang bisa kami bantu?</div>

      {/* Grup fitur */}
      <div className="feature-group">
        {/* Tracking Keuangan */}
        <Link to="/tracking/TrackingKeuangan" className="feature-box">  {/* Ganti <link> dengan <Link> */}
          <div className="feature-icon">
            <FontAwesomeIcon icon={faMagnifyingGlassDollar} size="2xl" />
          </div>
          <div className="feature-text">Tracking Keuangan</div>
        </Link>
        
        {/* Kalkulator Investasi */}
        <Link to="/kalkulator/KalkulatorInvestasi" className="feature-box">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faCalculator} size="2xl" />
          </div>
          <div className="feature-text">Kalkulator Investasi</div>
        </Link>

        {/* Perencanaan Tabungan */}
        <Link to="/perencanaan/perencanaan" className="feature-box">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faPiggyBank} size="2xl" />
          </div>
          <div className="feature-text">Perencanaan Tabungan</div>
        </Link>

      </div>
    </div>
  );
};

export default Main;

import React from 'react';
import './main.css';
import { Link } from 'react-router-dom';


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
        <div className="feature-box">
          <div className="feature-icon"></div>
          <div className="feature-text">Tracking Keuangan</div>
        </div>

        {/* Kalkulator Investasi */}
        <Link to="./kalkulator/KalkulatorInvestasi" className="feature-box">
          <div className="feature-icon"></div>
          <div className="feature-text">Kalkulator Investasi</div>
        </Link>

        {/* Perencanaan Tabungan */}
        <div className="feature-box">
          <div className="feature-icon"></div>
          <div className="feature-text">Perencanaan Tabungan</div>
        </div>
      </div>
    </div>
  );
};

export default Main;

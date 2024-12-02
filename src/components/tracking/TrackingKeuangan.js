import React from "react";
import "./TrackingKeuangan.css";

const TrackingKeuangan = ({ username }) => {
  return (
    <div className="tracking-container">
      {/* Header Section */}
      <div className="header-tracking">
        <div className="header-tracking-background"></div>
        <div className="header-tracking-profile"></div>
        <div className="header-tracking-greeting">Hi, {username}</div>
        <div className="header-tracking-company">Pennywise</div>
        <div className="header-tracking-tagline">Manage Your Finances Easily</div>
      </div>

      {/* Saldo Section */}
      <div className="saldo-tracking">
        <div className="saldo-tracking-background"></div>
        <div className="saldo-tracking-info">
          <div className="saldo-tracking-box"></div>
          <div className="saldo-tracking-label">Saldo</div>
          <div className="saldo-tracking-value">Rp. XXXXXXX</div>
        </div>
      </div>

      {/* Income & Outcome Section */}
      <div className="income-outcome-tracking">
        {/* Income Section */}
        <div className="income-section-tracking">
          <div className="income-background-tracking"></div>
          <div className="income-label-tracking">INCOME</div>
          <div className="income-icon-tracking"></div>
        </div>

        {/* Outcome Section */}
        <div className="outcome-section-tracking">
          <div className="outcome-background-tracking"></div>
          <div className="outcome-label-tracking">OUTCOME</div>
          <div className="outcome-icon-tracking"></div>
        </div>
      </div>

      {/* Arsip Keuangan Section */}
      <div className="arsip-section-tracking">
        {/* Arsip Item 1 */}
        <div className="arsip-item-tracking">
          <div className="arsip-item-background-tracking"></div>
          <div className="arsip-item-icon-tracking"></div>
          <div className="arsip-item-info-tracking">
            <div className="arsip-info-box-tracking"></div>
            <div className="arsip-type-tracking">Income</div>
            <div className="arsip-value-tracking">Rp. XXXXXXX</div>
            <div className="arsip-date-tracking">DD/MM/YYYY</div>
            <div className="arsip-desc-tracking">Desc</div>
          </div>
        </div>

        {/* Arsip Item 2 */}
        <div className="arsip-item-tracking">
          <div className="arsip-item-background-tracking"></div>
          <div className="arsip-item-icon-tracking"></div>
          <div className="arsip-item-info-tracking">
            <div className="arsip-info-box-tracking"></div>
            <div className="arsip-type-tracking">Outcome</div>
            <div className="arsip-value-tracking">Rp. XXXXXXX</div>
            <div className="arsip-date-tracking">DD/MM/YYYY</div>
            <div className="arsip-desc-tracking">Desc</div>
          </div>
        </div>
      </div>

      {/* Submit Section */}
      <div className="submit-section-tracking">
        <div className="submit-background-tracking"></div>
        <div className="submit-button-tracking">
          <div className="submit-icon-background-tracking"></div>
          <img
            className="submit-icon-tracking"
            src="https://via.placeholder.com/58x67"
            alt="Submit"
          />
        </div>
        <div className="submit-text-tracking">
          Ayo Lihat Analisan Laporan Aktivitas Keuangan
        </div>
      </div>
    </div>
  );
};

export default TrackingKeuangan;

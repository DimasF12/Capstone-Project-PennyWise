import React from "react";
import "./TrackingKeuangan.css";
import { useNavigate } from 'react-router-dom';

// Komponen Arsip Keuangan
const ArsipItem = ({ type, value, date, desc }) => (
  <div className="arsip-item-tracking">
    <div className="arsip-item-info-tracking">
      <div className="arsip-type-tracking">{type}</div>
      <div className="arsip-value-tracking">{value}</div>
      <div className="arsip-date-tracking">{date}</div>
      <div className="arsip-desc-tracking">{desc}</div>
    </div>
    <div className="arsip-item-icon-tracking">ppppp</div>
  </div>
);

const TrackingKeuangan = ({ username }) => {
  // Data arsip contoh
  const arsipData = [
    { type: "Income", value: "Rp. XXXXXXX", date: "DD/MM/YYYY", desc: "Desc" },
    { type: "Outcome", value: "Rp. XXXXXXX", date: "DD/MM/YYYY", desc: "Desc" },
  ];
  const navigate = useNavigate();
  return (
    <div className="tracking-container">
      <button className="tracking-back-button" onClick={() => navigate(-1)}>
        Kembali
      </button>
      {/* Header Section */}
      <header className="header-tracking">
        <div className="header-tracking-profile"></div>
        <h1 className="header-tracking-greeting">Hi, {username}</h1>
        <div className="header-tracking-company">Pennywise</div>
        <p className="header-tracking-tagline">Manage Your Finances Easily</p>
      </header>

      {/* Saldo Section */}
      <section className="saldo-tracking">
        <div className="saldo-tracking-box">
          <div className="saldo-tracking-label">Saldo</div>
          <div className="saldo-tracking-value">Rp. XXXXXXX</div>
        </div>
      </section>

      {/* Income & Outcome Section */}
      <section className="income-outcome-tracking">
        <div className="income-section-tracking">
          <div className="income-label-tracking">INCOME</div>
          <div className="income-icon-tracking"></div>
        </div>
        <div className="outcome-section-tracking">
          <div className="outcome-label-tracking">OUTCOME</div>
          <div className="outcome-icon-tracking"></div>
        </div>
      </section>

      {/* Arsip Keuangan Section */}
      <section className="arsip-section-tracking">
        {arsipData.map((item, index) => (
          <ArsipItem
            key={index}
            type={item.type}
            value={item.value}
            date={item.date}
            desc={item.desc}
          />
        ))}
      </section>

      {/* Submit Section */}
      <section className="submit-section-tracking">
        <button className="submit-button-tracking">
          Ayo Lihat Analisan Laporan Aktivitas Keuangan
        </button>
      </section>
    </div>
  );
};

export default TrackingKeuangan;

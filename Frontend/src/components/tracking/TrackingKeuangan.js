import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import IncomeModal from "./modal/IncomeModal"; // Pastikan path modal sesuai dengan struktur folder Anda
import "./TrackingKeuangan.css";

const TrackingKeuangan = ({ username }) => {
  // State untuk modal
  const [isModalVisible, setModalVisible] = useState(false);

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
        <div
          className="income-section-tracking"
          onClick={() => setModalVisible(true)} // Buka modal saat Income diklik
        >
          <div className="income-icon-tracking">
            <FontAwesomeIcon icon={faInbox} size="2xl" />
          </div>
          <div className="income-label-tracking">Pemasukan</div>
        </div>

        <div className="outcome-section-tracking">
          <div className="income-icon-tracking">
            <FontAwesomeIcon icon={faInbox} size="2xl" />
          </div>
          <div className="outcome-label-tracking">Pengeluaran</div>
        </div>
      </section>

      {/* Arsip Keuangan Section */}
      <section className="arsip-section-tracking">
        {arsipData.map((item, index) => (
          <div key={index} className="arsip-item-tracking">
            <div className="arsip-item-info-tracking">
              <div className="arsip-type-tracking">{item.type}</div>
              <div className="arsip-value-tracking">{item.value}</div>
              <div className="arsip-date-tracking">{item.date}</div>
              <div className="arsip-desc-tracking">{item.desc}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Submit Section */}
      <section className="submit-section-tracking">
        <button className="submit-button-tracking">
          Ayo Lihat Analisa Laporan Aktivitas Keuangan
        </button>
      </section>

      {/* Income Modal */}
      <IncomeModal isOpen={isModalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default TrackingKeuangan;

import React, { useState } from 'react';
import './KalkulatorInvestasi.css';
import { Link } from 'react-router-dom';

const KalkulatorInvestasi = ({ username }) => {
  const [currentStep, setCurrentStep] = useState(1); // Menyimpan langkah input yang aktif
  const [inputs, setInputs] = useState({}); // Menyimpan nilai setiap input

  // Fungsi untuk memformat angka dengan pemisah ribuan
  const formatNumber = (value) => {
    if (!value) return '';
    // Mengganti angka menjadi format ribuan, misal 1000 menjadi 1,000
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e, fieldName) => {
    const rawValue = e.target.value.replace(/,/g, ''); // Hilangkan koma untuk pengolahan lebih lanjut

    // Periksa apakah input adalah angka yang valid dan bukan string kosong
    if (!isNaN(rawValue) && rawValue !== '') {
      // Format angka dengan pemisah ribuan setelah input
      setInputs({ ...inputs, [fieldName]: formatNumber(rawValue) });
    } else if (rawValue === '') {
      // Jika input kosong, biarkan input tersebut kosong
      setInputs({ ...inputs, [fieldName]: '' });
    }
  };

  // Fungsi untuk menangani tombol Enter dan melanjutkan ke input berikutnya
  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter' && currentStep === index + 1) {
      // Lanjutkan ke input berikutnya jika Enter ditekan
      setCurrentStep((prevStep) => prevStep + 1); 
    }
  };

  return (
    <div className="kalkulator-investasi-container">
      {/* Navigation Bar */}
      <div className="nav-container">
        <Link to="../" className="back-button">Back</Link>
        <div className="nav-title">
          <img
            className="calculator-icon"
            src="https://via.placeholder.com/45x45"
            alt="Calculator Icon"
          />
          <div className="title-text">Kalkulator Investasi</div>
        </div>
      </div>

      {/* Header Section */}
      <div className="header-container">
        <div className="profile-icon"></div>
        <div className="greeting-text">Hi, {username}</div>
        <div className="company-name">Pennywise</div>
        <div className="tagline">Manage Your Finances Easily</div>
      </div>

      {/* Calculator Section */}
      <div className="calculator-container">
        {[ 
          { label: 'Jumlah uang yang ingin kamu capai', prefix: 'Rp', fieldName: 'uangCapai' },
          { label: 'Jumlah waktu yang kamu perlukan', suffix: 'Tahun lagi', fieldName: 'waktu' },
          { label: 'Uang yang kamu miliki saat ini', prefix: 'Rp', fieldName: 'uangSaatIni' },
          { label: 'Kamu menabung setiap', suffix: 'Tahun lagi', fieldName: 'menabung' },
          { label: 'Kamu akan menambahkan dana pada', suffix: 'Tahun lagi', fieldName: 'dana' },
          { label: 'Target investasimu tiap bulan', prefix: 'Rp', fieldName: 'targetInvestasi' },
          { label: 'Kamu akan investasi di produk yang returnnya', suffix: '%/Tahun', fieldName: 'returnInvestasi' },
        ].map((input, index) => (
          <div
            key={index}
            className={`input-group ${currentStep > index ? 'visible' : ''}`}
          >
            <span className="circle-icon"></span>
            <label className={`input-label ${currentStep === index + 1 ? 'animasi-teks' : ''}`}>
              {input.label}
            </label> {/* Apply typing animation only when step is active */}
            <div className="input-field">
              {input.prefix && <span className="currency">{input.prefix}</span>}
              <input
                type="text" // Changed to text input instead of number
                className="input"
                value={inputs[input.fieldName] || ''}
                placeholder="0"
                onChange={(e) => handleInputChange(e, input.fieldName)}
                onKeyDown={(e) => handleKeyPress(e, index)}
              />
              {input.suffix && <span className="currency">{input.suffix}</span>}
            </div>
          </div>
        ))}

        <div className="send-button">
          <button className="submit-button">Ayo lihat hasil strategimu</button>
        </div>
      </div>
    </div>
  );
};

export default KalkulatorInvestasi;

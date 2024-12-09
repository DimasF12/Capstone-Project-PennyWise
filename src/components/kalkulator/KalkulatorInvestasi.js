import React, { useState } from 'react';
import './KalkulatorInvestasi.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

const KalkulatorInvestasi = ({ username }) => {
  const [currentStep, setCurrentStep] = useState(1); // Menyimpan langkah input yang aktif
  const [inputs, setInputs] = useState({}); // Menyimpan nilai setiap input

  const formatNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputChange = (e, fieldName) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (!isNaN(rawValue) && rawValue !== '') {
      setInputs({ ...inputs, [fieldName]: formatNumber(rawValue) });
    } else if (rawValue === '') {
      setInputs({ ...inputs, [fieldName]: '' });
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter' && currentStep === index + 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleButtonClick = (fieldName, value) => {
    setInputs({ ...inputs, [fieldName]: value }); // Simpan nilai tombol
    setCurrentStep((prevStep) => prevStep + 1); // Pindah ke langkah berikutnya
  };

  return (
    <div className="kalkulator-investasi-container">
      {/* Navigation Bar */}
      <div className="nav-container">
        <Link to="../" className="back-button">Back</Link>
        <div className="nav-title">
          <FontAwesomeIcon icon={faCalculator} className="calculator-icon" />
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
          {
            label: 'Kamu menabung setiap',
            fieldName: 'menabung',
            isButtonGroup: true,
            buttonOptions: [
              { text: 'Akhir Bulan', value: 'akhirbulan' },
              { text: 'Awal Bulan', value: 'awalbulan' },
            ],
          },
          {
            label: 'Kamu akan menambahkan dana pada',
            fieldName: 'dana',
            isButtonGroup: true,
            buttonOptions: [
              { text: 'Akhir Bulan', value: 'akhirbulan' },
              { text: 'Awal Bulan', value: 'awalbulan' },
            ],
          },
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
            </label>

            {input.isButtonGroup ? (
              <div className="button-group">
                {input.buttonOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`choice-button ${
                      inputs[input.fieldName] === option.value ? 'active' : ''
                    }`}
                    onClick={() => handleButtonClick(input.fieldName, option.value)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            ) : (
              <div className="input-field">
                {input.prefix && <span className="currency">{input.prefix}</span>}
                <input
                  type="text"
                  className="input"
                  value={inputs[input.fieldName] || ''}
                  placeholder="0"
                  onChange={(e) => handleInputChange(e, input.fieldName)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                />
                {input.suffix && <span className="currency">{input.suffix}</span>}
              </div>
            )}
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

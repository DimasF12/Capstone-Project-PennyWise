import React, { useState } from 'react';
import './KalkulatorInvestasi.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const KalkulatorInvestasi = ({ username }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate(); // Hook untuk navigasi

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
    setInputs({ ...inputs, [fieldName]: value });
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const validateInputs = () => {
    if (!inputs.uangSaatIni || !inputs.targetInvestasi || !inputs.returnInvestasi || !inputs.waktu || !inputs.uangCapai || !inputs.menabung || !inputs.dana) {
      setResult('Semua kolom harus diisi.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const initialAmount = parseFloat(inputs.uangSaatIni.replace(/,/g, ''));
    const monthlyInvestment = parseFloat(inputs.targetInvestasi.replace(/,/g, ''));
    const annualReturnRate = parseFloat(inputs.returnInvestasi);
    const years = parseInt(inputs.waktu, 10);
    const targetAmount = parseFloat(inputs.uangCapai.replace(/,/g, ''));
    const frequency = inputs.menabung;  // Nilai dari "Setiap Bulan" atau "Setiap Tahun"
    const additionTime = inputs.dana;   // Nilai dari "Akhir Bulan" atau "Awal Bulan"

    try {
      const response = await axios.post('http://127.0.0.1:5000/calculate', {
        initialAmount,
        monthlyInvestment,
        annualReturnRate,
        years,
        targetAmount,
        frequency,    // Mengirimkan frekuensi tabungan
        additionTime, // Mengirimkan waktu penambahan dana
      });

      setResult(response.data.message);  // Menampilkan hasil perhitungan

      // Arahkan pengguna ke halaman HasilStrategi
      navigate('../hasil/HasilStrategi', { state: { message: response.data.message } });
    } catch (error) {
      console.error('Error calculating investment:', error);
      setResult('Terjadi kesalahan saat menghitung investasi.');
    }
  };

  return (
    <div className="kalkulator-investasi-container">
      <div className="nav-container">
        <Link to="../" className="back-button">Kembali</Link>
        <div className="nav-title">
          <FontAwesomeIcon icon={faCalculator} className="calculator-icon" />
          <div className="title-text">Kalkulator Investasi</div>
        </div>
      </div>

      <div className="header-container">
        <div className="profile-icon"></div>
        <div className="greeting-text">Hi, {username}</div>
        <div className="company-name">Pennywise</div>
        <div className="tagline">Atur Keuangan Anda dengan Mudah</div>
      </div>

      <div className="calculator-container">
        {[{ label: 'Jumlah uang yang ingin Anda capai', prefix: 'Rp', fieldName: 'uangCapai' },
          { label: 'Jumlah waktu yang Anda perlukan', suffix: 'Tahun lagi', fieldName: 'waktu' },
          { label: 'Uang yang Anda miliki saat ini', prefix: 'Rp', fieldName: 'uangSaatIni' },
          {
            label: 'Anda menabung setiap',
            fieldName: 'menabung',
            isButtonGroup: true,
            buttonOptions: [
              { text: 'Setiap Tahun', value: 'setiaptahun' },
              { text: 'Setiap Bulan', value: 'setiapbulan' },
            ],
          },
          {
            label: 'Anda akan menambahkan dana pada',
            fieldName: 'dana',
            isButtonGroup: true,
            buttonOptions: [
              { text: 'Akhir Bulan', value: 'akhirbulan' },
              { text: 'Awal Bulan', value: 'awalbulan' },
            ],
          },
          { label: 'Target investasi Anda tiap bulan', prefix: 'Rp', fieldName: 'targetInvestasi' },
          { label: 'Anda akan berinvestasi di produk yang returnnya', suffix: '%/Tahun', fieldName: 'returnInvestasi' },
        ].map((input, index) => (
          <div key={index} className={`input-group ${currentStep > index ? 'visible' : ''}`}>
            <span className="circle-icon"></span>
            <label className={`input-label ${currentStep === index + 1 ? 'animasi-teks' : ''}`}>
              {input.label}
            </label>

            {input.isButtonGroup ? (
              <div className="button-group">
                {input.buttonOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`choice-button ${inputs[input.fieldName] === option.value ? 'active' : ''}`}
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
          <button className="submit-button" onClick={handleSubmit}>Ayo lihat hasil strategimu</button>
        </div>

        {result && <div className="result">{result}</div>}
      </div>
    </div>
  );
};

export default KalkulatorInvestasi;

import React, { useState } from 'react';
import './KalkulatorInvestasi.css';
import { Link, useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons'; 


const KalkulatorInvestasi = ({ username }) => {
  const [currentStep, setCurrentStep] = useState(1); // Menyimpan langkah input yang aktif
  const [inputs, setInputs] = useState({}); // Menyimpan nilai setiap input
  const [resultMessage, setResultMessage] = useState(''); // State for result message
  const navigate = useNavigate(); // Ganti useHistory dengan useNavigate

  const formatNumber = (value) => {
    if (!value) return '';
    // Mengganti angka menjadi format ribuan, misal 1000 menjadi 1,000
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputChange = (e, fieldName) => {
    const rawValue = e.target.value.replace(/,/g, ''); 

    if (!isNaN(rawValue) && rawValue !== '') {
      // Format angka dengan pemisah ribuan setelah input
      setInputs({ ...inputs, [fieldName]: formatNumber(rawValue) });
    } else if (rawValue === '') {
      // Jika input kosong, biarkan input tersebut kosong
      setInputs({ ...inputs, [fieldName]: '' });
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter' && currentStep === index + 1) {
      // Lanjutkan ke input berikutnya jika Enter ditekan
      setCurrentStep((prevStep) => prevStep + 1); 
    }
  };

  const calculateInvestmentResult = () => {
    // Parse input values
    const uangCapai = parseFloat(inputs.uangCapai.replace(/,/g, '')) || 0;
    const uangSaatIni = parseFloat(inputs.uangSaatIni.replace(/,/g, '')) || 0;
    const waktu = parseFloat(inputs.waktu) || 0;
    const targetInvestasi = parseFloat(inputs.targetInvestasi.replace(/,/g, '')) || 0;
    const returnInvestasi = parseFloat(inputs.returnInvestasi) || 0;

    const emptyFields = [];
    if (!inputs.uangCapai) emptyFields.push('Jumlah uang yang ingin kamu capai');
    if (!inputs.uangSaatIni) emptyFields.push('Uang yang kamu miliki saat ini');
    if (!inputs.waktu) emptyFields.push('Jumlah waktu yang kamu perlukan');
    if (!inputs.targetInvestasi) emptyFields.push('Target investasimu tiap bulan');
    if (!inputs.returnInvestasi) emptyFields.push('Kamu akan investasi di produk yang returnnya');

    if (emptyFields.length > 0) {
        setResultMessage(`Strategi gagal! Pastikan untuk mengisi: ${emptyFields.join(', ')}.`);
        return; // Exit the function early
    }

    const totalInvestasi = uangSaatIni + (targetInvestasi * 12 * waktu);
    const totalReturn = totalInvestasi * Math.pow(1 + returnInvestasi / 100, waktu);

    const totalUangDibutuhkan = uangCapai;
    const jumlahInvestasiBulanan = targetInvestasi;
    const lamaInvestasi = waktu;
    const hasilInvestasi = totalReturn;

    if (totalReturn >= uangCapai) {
        setResultMessage(`Strategi berhasil! Total return: Rp ${formatNumber(totalReturn.toFixed(2))}`);
    } else {
        setResultMessage(`Strategi gagal! Total return: Rp ${formatNumber(totalReturn.toFixed(2))}`);
    }

    // Navigate to the results page
    navigate('/HasilStrategi', { state: { hasil: { totalUangDibutuhkan, uangSaatIni, jumlahInvestasiBulanan, returnInvestasi, lamaInvestasi, hasilInvestasi } } });
};


const isFormValid = () => {
    return (
        inputs.uangCapai &&
        inputs.uangSaatIni &&
        inputs.waktu &&
        inputs.targetInvestasi &&
        inputs.returnInvestasi
    );
};
  
  return (

    <div className="kalkulator-investasi-container">

      {/* Navigation Bar */}
      <div className="nav-container">
        <Link to="../" className="back-button">Back</Link>
        <div className="nav-title">
          {/* Menggunakan ikon FontAwesome */}
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

      {resultMessage && <div className="result-message">{resultMessage}</div>}

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
            <button 
              className="submit-button" 
              onClick={calculateInvestmentResult} 
              disabled={!isFormValid()}
            >
              Ayo lihat hasil strategimu
            </button>
          </div>

      </div>
    </div>
  );
};

export default KalkulatorInvestasi;

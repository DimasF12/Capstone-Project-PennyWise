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
  const [headerColor, setHeaderColor] = useState('');
  const navigate = useNavigate();

  // Format angka dengan koma
  const formatNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Tangani perubahan input
  const handleInputChange = (e, fieldName) => {
    const rawValue = e.target.value.replace(/,/g, ''); // Hapus koma dari input
    if (!isNaN(rawValue) && rawValue !== '') {
      setInputs({ ...inputs, [fieldName]: formatNumber(rawValue) });
    } else if (rawValue === '') {
      setInputs({ ...inputs, [fieldName]: '' });
    }
  };

  // Tangani event ketika tombol ditekan (Enter)
  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter' && currentStep === index + 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // Tangani klik pada button untuk input yang berupa group tombol
  const handleButtonClick = (fieldName, value) => {
    setInputs({ ...inputs, [fieldName]: value });
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Validasi apakah semua input sudah terisi
  const validateInputs = () => {
    const requiredFields = ['uangSaatIni', 'targetInvestasi', 'returnInvestasi', 'waktu', 'uangCapai'];
    for (let field of requiredFields) {
      const rawValue = inputs[field]?.replace(/,/g, '');
      if (!rawValue || isNaN(rawValue) || parseFloat(rawValue) <= 0) {
        setResult(`Kolom "${field}" harus berupa angka positif.`);
        return false;
      }
    }
    return true;
  };  

  // Tangani submit untuk perhitungan
  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const initialAmount = parseFloat(inputs.uangSaatIni.replace(/,/g, ''));
    const monthlyInvestment = parseFloat(inputs.targetInvestasi.replace(/,/g, ''));
    const annualReturnRate = parseFloat(inputs.returnInvestasi);
    const years = parseInt(inputs.waktu, 10);
    const targetAmount = parseFloat(inputs.uangCapai.replace(/,/g, ''));
    console.log("Data yang dikirim:", {
      uangSaatIni: initialAmount,
      targetInvestasi: monthlyInvestment,
      returnInvestasi: annualReturnRate,
      waktu: years,
      uangCapai: targetAmount
    });    

    try {
      // Kirim data ke backend
      const response = await axios.post('http://127.0.0.1:5000/calculate', {
        uangSaatIni: initialAmount,
        targetInvestasi: monthlyInvestment,
        returnInvestasi: annualReturnRate,
        waktu: years,
        uangCapai: targetAmount,
      });

      if (response.status === 200) {
        const result = response.data;

        // Menentukan warna header berdasarkan hasil
        if (result.message.includes("Selamat")) {
          setHeaderColor('green');
        } else {
          setHeaderColor('red');
        }

        // Kirimkan data perhitungan ke halaman HasilStrategi
        navigate('../hasil/HasilStrategi', {
          state: {
            hasil: {
              totalUangDibutuhkan: result.totalUangDibutuhkan,
              uangSaatIni: initialAmount,
              jumlahInvestasiBulanan: monthlyInvestment,
              returnInvestasi: annualReturnRate,
              lamaInvestasi: years,
              hasilInvestasi: result.hasilInvestasi,
              message: result.message,
            }
          }
        });
      } else {
        setResult('Terjadi kesalahan pada permintaan.');
      }
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

      {/* Mengganti warna header sesuai hasil */}
      <div className="header-container" style={{ backgroundColor: headerColor }}>
        <div className="profile-icon"></div>
        <div className="greeting-text">Hi, {username}</div>
        <div className="company-name">Pennywise</div>
        <div className="tagline">Atur Keuangan Anda dengan Mudah</div>
      </div>

      <div className="calculator-container">
        {[
          { label: 'Jumlah uang yang ingin Anda capai', prefix: 'Rp', fieldName: 'uangCapai' },
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

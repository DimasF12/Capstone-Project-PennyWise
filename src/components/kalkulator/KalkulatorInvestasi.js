import React, { useState } from 'react';
import './KalkulatorInvestasi.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

const KalkulatorInvestasi = ({ username }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

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

  const calculateFutureValue = (initialAmount, monthlyInvestment, annualReturnRate, years) => {
    let currentAmount = initialAmount;
    const monthlyReturnRate = annualReturnRate / 12 / 100;
    const totalMonths = years * 12;

    for (let i = 0; i < totalMonths; i++) {
      currentAmount += monthlyInvestment;
      currentAmount *= (1 + monthlyReturnRate);
    }

    return currentAmount;
  };

  const calculateRequiredMonthlyInvestment = (initialAmount, targetAmount, annualReturnRate, years) => {
    const monthlyReturnRate = annualReturnRate / 12 / 100;
    const totalMonths = years * 12;
    const fvWithoutInvestment = initialAmount * Math.pow(1 + monthlyReturnRate, totalMonths);
    const futureValueNeeded = targetAmount - fvWithoutInvestment;

    const requiredMonthlyInvestment = futureValueNeeded * monthlyReturnRate / (Math.pow(1 + monthlyReturnRate, totalMonths) - 1);
    return requiredMonthlyInvestment;
  };

  const calculateRequiredDuration = (initialAmount, monthlyInvestment, annualReturnRate, targetAmount) => {
    let currentAmount = initialAmount;
    const monthlyReturnRate = annualReturnRate / 12 / 100;
    let months = 0;

    while (currentAmount < targetAmount) {
      currentAmount += monthlyInvestment;
      currentAmount *= (1 + monthlyReturnRate);
      months++;
    }

    return months / 12;
  };

  const handleSubmit = () => {
    const initialAmount = parseFloat(inputs.uangSaatIni.replace(/,/g, ''));
    const monthlyInvestment = parseFloat(inputs.targetInvestasi.replace(/,/g, ''));
    const annualReturnRate = parseFloat(inputs.returnInvestasi);
    const years = parseInt(inputs.waktu, 10);
    const targetAmount = parseFloat(inputs.uangCapai.replace(/,/g, ''));

    const futureValue = calculateFutureValue(initialAmount, monthlyInvestment, annualReturnRate, years);

    if (futureValue >= targetAmount) {
      setResult(`Selamat! Anda akan memiliki Rp ${futureValue.toFixed(2)} setelah ${years} tahun, yang memenuhi target Anda.`);
    } else {
      const solution = window.prompt("Anda tidak akan mencapai target Anda. Apakah Anda ingin meningkatkan investasi bulanan Anda (1) atau memperpanjang durasi (2)? Masukkan 1 atau 2:");

      if (solution === "1") {
        const requiredMonthlyInvestment = calculateRequiredMonthlyInvestment(initialAmount, targetAmount, annualReturnRate, years);
        setResult(`Untuk mencapai target Rp ${targetAmount}, Anda perlu berinvestasi Rp ${requiredMonthlyInvestment.toFixed(2)} setiap bulan.`);
      } else if (solution === "2") {
        const requiredYears = calculateRequiredDuration(initialAmount, monthlyInvestment, annualReturnRate, targetAmount);
        setResult(`Untuk mencapai target Rp ${targetAmount}, Anda perlu berinvestasi selama ${requiredYears.toFixed(2)} tahun.`);
      } else {
        setResult("Pilihan tidak valid. Silakan masukkan 1 atau 2.");
      }
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
          <button className="submit-button" onClick={handleSubmit}>Ayo lihat hasil strategimu</button>
        </div>

        {result && <div className="result">{result}</div>}
      </div>
    </div>
  );
};

export default KalkulatorInvestasi;

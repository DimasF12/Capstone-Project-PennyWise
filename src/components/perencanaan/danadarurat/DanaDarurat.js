import React, { useState, useEffect } from 'react';
import './DanaDarurat.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

const DanaDarurat = ({ username }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputs, setInputs] = useState({});
  const [resultMessage, setResultMessage] = useState('');
  const navigate = useNavigate();

  const formatNumber = (value) => {
    if (!value) return '';
    const number = value.toString().replace(/[^0-9]/g, ''); // Hapus karakter non-angka
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputChange = (e, fieldName) => {
    const rawValue = e.target.value.replace(/,/g, ''); // Hapus format sebelumnya
    if (!isNaN(rawValue) && rawValue !== '') {
      const formattedValue = formatNumber(rawValue);
      setInputs((prevInputs) => ({ ...prevInputs, [fieldName]: formattedValue }));
    } else {
      setInputs((prevInputs) => ({ ...prevInputs, [fieldName]: '' }));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter' && currentStep === index + 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const calculateEmergencyFund = () => {
    const {
        pengeluaranBulanan,
        jumlahTanggungan,
        danaDaruratSaatIni,
        returnInvestasi,
        lamaTarget,
        sudahMenikah,
    } = inputs;

    // Daftar field yang wajib diisi
    const requiredFields = [
        'pengeluaranBulanan',
        'danaDaruratSaatIni',
        'returnInvestasi',
        'lamaTarget',
    ];

    // Validasi input yang hilang
    const missingFields = requiredFields.filter((field) => !inputs[field]);
    if (sudahMenikah === 'sudah' && !jumlahTanggungan) {
        missingFields.push('jumlahTanggungan');
    }

    if (missingFields.length > 0) {
        setResultMessage(`Pastikan untuk mengisi: ${missingFields.join(', ')}.`);
        return;
    }

    // Parsing nilai input
    const monthlyExpenses = Number(pengeluaranBulanan.replace(/,/g, ''));
    const dependents = sudahMenikah === 'sudah' ? Number(jumlahTanggungan) : 0;
    const currentFund = Number(danaDaruratSaatIni.replace(/,/g, ''));
    const investmentReturn = Number(returnInvestasi) / 100; // Dari persen ke desimal
    const durationTarget = Number(lamaTarget);

    // Hitung kebutuhan dana darurat dan kekurangannya
    const requiredFund = monthlyExpenses * (dependents + 3);
    const fundShortage = Math.max(requiredFund - currentFund, 0);

    // Hitung investasi bulanan dengan rumus future value of annuity (FVA)
    const n = durationTarget; // Durasi dalam bulan
    const r = investmentReturn / 12; // Bunga per bulan
    const monthlyInvestment = 
        fundShortage > 0
            ? fundShortage / ((Math.pow(1 + r, n) - 1) / r)
            : 0;

    // Format angka
    const formatNumber = (num) => num.toLocaleString('id-ID');

    // Set pesan hasil
    setResultMessage(
        `Dana Darurat yang Diperlukan: Rp ${formatNumber(requiredFund)}\n` +
        `Kekurangan Dana: Rp ${formatNumber(fundShortage)}\n` +
        `Investasi Bulanan: Rp ${formatNumber(Math.ceil(monthlyInvestment))}\n` +
        `Return Investasi: ${returnInvestasi}% / tahun\n` +
        `Lama Target: ${lamaTarget} bulan`
    );

    // Navigasi dengan hasil perhitungan
    navigate('/HitungDana/HitungDanaDarurat', {
        state: {
            hasil: {
                requiredFund,
                currentFund,
                fundShortage,
                monthlyInvestment: Math.ceil(monthlyInvestment),
                investmentReturn,
                durationTarget,
            },
        },
    });
};

  const isFormValid = () => {
    return (
      inputs.pengeluaranBulanan &&
      (inputs.sudahMenikah === 'belum' || inputs.jumlahTanggungan) &&
      inputs.danaDaruratSaatIni &&
      inputs.targetInvestasi &&
      inputs.returnInvestasi &&
      inputs.lamaTarget
    );
  };

  useEffect(() => {
    try {
      const savedInputs = JSON.parse(localStorage.getItem('inputs'));
      if (savedInputs) {
        const formattedInputs = Object.keys(savedInputs).reduce((acc, key) => {
          acc[key] = formatNumber(savedInputs[key]);
          return acc;
        }, {});
        setInputs(formattedInputs);
      }
    } catch (error) {
      console.error('Error loading saved inputs:', error);
      localStorage.removeItem('inputs'); // Reset jika data rusak
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inputs', JSON.stringify(inputs));
  }, [inputs]);

  return (
    <div className="kalkulator-danadarurat-container">
      <div className="nav-container-dana">
        <Link to="../" className="back-button">Back</Link>
        <div className="nav-title-dana">
          <FontAwesomeIcon icon={faCalculator} className="calculator-icon" />
          <div className="title-text">Dana Darurat</div>
        </div>
      </div>

      <div className="header-container-danadarurat">
        <div className="profile-icon"></div>
        <div className="greeting-text">Hi, {username}</div>
        <div className="company-name">Pennywise</div>
        <div className="tagline">Manage Your Finances Easily</div>
      </div>

      {resultMessage && <div className="result-message">{resultMessage}</div>}

      <div className="calculator-container-danadarurat">
        {[{
          label: 'Pengeluaran wajib mu setiap bulan', fieldName: 'pengeluaranBulanan', prefix: 'Rp'
        },
        {
          label: 'Apakah kamu sudah menikah?', fieldName: 'sudahMenikah', options: ['sudah', 'belum'],
        },
        {
          label: 'Jumlah tanggunganmu?', fieldName: 'jumlahTanggungan', suffix: 'orang', condition: inputs.sudahMenikah === 'sudah',
        },
        {
          label: 'Berapa lama targetmu mengumpulkan dana darurat?', fieldName: 'lamaTarget', suffix: 'bulan',
        },
        {
          label: 'Jumlah dana darurat yang kamu miliki saat ini?', fieldName: 'danaDaruratSaatIni', prefix: 'Rp',
        },
        {
          label: 'Target investasi kamu setiap bulan?', fieldName: 'targetInvestasi', prefix: 'Rp',
        },
        {
          label: 'Kamu akan investasi di produk yang returnnya', fieldName: 'returnInvestasi', suffix: '% tahun',
        }].map((input, index) => (
          input.condition === undefined || input.condition ? (
            <div key={index} className={`input-group ${currentStep >= index + 1 ? 'visible' : ''}`}>
              <label className="input-label">{input.label}</label>
              <div className="input-field">
                {input.options ? (
                  input.options.map((option) => (
                    <button
                      key={option}
                      className={`option-button ${inputs[input.fieldName] === option ? 'selected' : ''}`}
                      onClick={() => {
                        setInputs((prevInputs) => ({ ...prevInputs, [input.fieldName]: option }));
                        setCurrentStep((prevStep) =>
                          input.fieldName === 'sudahMenikah' && option === 'belum'
                            ? prevStep + 2
                            : prevStep + 1
                        );
                      }}
                    >
                      {option.toUpperCase()}
                    </button>
                  ))
                ) : (
                  <>
                    {input.prefix && <span className="currency">{input.prefix}</span>}
                    <input
                      type="text"
                      value={inputs[input.fieldName] || ''}
                      placeholder="0"
                      onChange={(e) => handleInputChange(e, input.fieldName)}
                      onBlur={(e) => {
                        const formattedValue = formatNumber(e.target.value.replace(/,/g, ''));
                        setInputs((prevInputs) => ({ ...prevInputs, [input.fieldName]: formattedValue }));
                      }}
                      onKeyDown={(e) => handleKeyPress(e, index)}
                    />
                    {input.suffix && <span className="currency">{input.suffix}</span>}
                  </>
                )}
              </div>
            </div>
          ) : null
        ))}

        <div className="send-button">
          <button
            className="submit-button"
            onClick={calculateEmergencyFund}
            disabled={!isFormValid()}
          >
            Hitung Dana Daruratmu
          </button>
        </div>
      </div>

    </div>
  );
};

export default DanaDarurat;

import React, { useState, useEffect} from 'react';
import './BarangImpian.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

const BarangImpian = ({ username }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputs, setInputs] = useState({});
  const [resultMessage, setResultMessage] = useState('');
  const [errorFields, setErrorFields] = useState({});
  const navigate = useNavigate();

  const formatNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputChange = (e, fieldName) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (!isNaN(rawValue) && rawValue !== '') {
      setInputs({ ...inputs, [fieldName]: formatNumber(rawValue) });
      setErrorFields({ ...errorFields, [fieldName]: '' }); // Clear error for this field
    } else if (rawValue === '') {
      setInputs({ ...inputs, [fieldName]: '' });
      setErrorFields({ ...errorFields, [fieldName]: 'Field ini tidak boleh kosong' }); // Set error for this field
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter' && currentStep === index + 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  useEffect(() => {
    const { hargaBarang, persentaseDP, uangSaatIni } = inputs;
  
    // Pastikan hargaBarang dan persentaseDP memiliki nilai
    if (hargaBarang && persentaseDP) {
      // Konversi input menjadi angka
      const hargaBarangNum = parseFloat(hargaBarang.replace(/,/g, '')) || 0;
      const persentaseDPNum = parseFloat(persentaseDP) || 0;
      const uangSaatIniNum = parseFloat(uangSaatIni?.replace(/,/g, '')) || 0;
  
      // Hitung nilai DP dan Pokok Utang
      const dp = (hargaBarangNum * persentaseDPNum) / 100;
      const pokokUtang = hargaBarangNum - dp;
      const totalUangDP = dp - uangSaatIniNum;
  
      // Format hasil perhitungan
      const formattedDp = formatNumber(dp.toFixed(2));
      const formattedPokokUtang = formatNumber(pokokUtang.toFixed(2));
      const formattedTotalUangDP = formatNumber(totalUangDP.toFixed(2));
  
      // Perbarui state hanya jika nilai berubah
      setInputs((prevInputs) => {
        if (
          prevInputs.dpSetara === formattedDp &&
          prevInputs.pokokUtang === formattedPokokUtang &&
          prevInputs.totalUangDP === formattedTotalUangDP
        ) {
          return prevInputs; // Tidak ada perubahan
        }
  
        return {
          ...prevInputs,
          dpSetara: formattedDp,
          pokokUtang: formattedPokokUtang,
          totalUangDP: formattedTotalUangDP,
        };
      });
    }
  }, [inputs]);  
  

  const calculateInvestmentImpian = () => {
    const { hargaBarang, uangSaatIni, targetInvestasi, lamaInvestasi, returnInvestasi } = inputs;

    // Validasi input kosong
    const emptyFields = [];
    if (!hargaBarang) emptyFields.push('Harga barang impianmu saat ini');
    if (!uangSaatIni) emptyFields.push('Uang yang kamu miliki saat ini');
    if (!targetInvestasi) emptyFields.push('Target investasi tiap bulan');
    if (!returnInvestasi) emptyFields.push('Return investasi per tahun');
    if (!lamaInvestasi) emptyFields.push('Durasi investasi (bulan)');

    if (emptyFields.length > 0) {
        setResultMessage(`Strategi gagal! Pastikan untuk mengisi: ${emptyFields.join(', ')}.`);
        return;
    }

    // Konversi input menjadi angka
    const hargaBarangNum = parseFloat(hargaBarang.replace(/,/g, '')) || 0;
    const uangSaatIniNum = parseFloat(uangSaatIni.replace(/,/g, '')) || 0;
    const targetInvestasiNum = parseFloat(targetInvestasi.replace(/,/g, '')) || 0;
    const lamaInvestasiNum = parseFloat(lamaInvestasi) || 0;
    const returnInvestasiNum = parseFloat(returnInvestasi) || 0;

    // Total uang yang dibutuhkan adalah harga barang
    const totalUangDibutuhkan = hargaBarangNum;

    // Hitung total investasi dan return
    const totalInvestasi = targetInvestasiNum * lamaInvestasiNum; // Investasi total tanpa bunga
    const monthlyReturn = returnInvestasiNum / 12 / 100; // Return investasi per bulan
    const totalReturn = totalInvestasi * Math.pow(1 + monthlyReturn, lamaInvestasiNum); // Akumulasi return investasi

    // Hasil investasi adalah uang saat ini + return investasi
    const hasilInvestasi = uangSaatIniNum + totalReturn;

    // Tentukan apakah strategi berhasil atau tidak
    const isSuccessful = hasilInvestasi >= totalUangDibutuhkan;

    // Pesan hasil
    if (isSuccessful) {
        setResultMessage(
            `Strategi berhasil! Hasil investasi: Rp ${formatNumber(hasilInvestasi.toFixed(2))}, Total yang dibutuhkan: Rp ${formatNumber(totalUangDibutuhkan.toFixed(2))}.`
        );
    } else {
        setResultMessage(
            `Strategi gagal! Hasil investasi: Rp ${formatNumber(hasilInvestasi.toFixed(2))}, Total yang dibutuhkan: Rp ${formatNumber(totalUangDibutuhkan.toFixed(2))}.`
        );
    }

    // Navigasi ke halaman hasil
    navigate('/hasilbarang/HasilBarangImpian', {
        state: {
            hasil: {
                totalUangDibutuhkan,
                uangSaatIni: uangSaatIniNum,
                targetInvestasi: targetInvestasiNum,
                returnInvestasi: returnInvestasiNum,
                lamaInvestasi: lamaInvestasiNum,
                hasilInvestasi,
            },
        },
    });
};
  

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      inputs.hargaBarang &&
      inputs.persentaseDP && // Ensure this matches the input field name
      inputs.uangSaatIni &&
      inputs.targetInvestasi &&
      inputs.returnInvestasi &&
      inputs.lamaInvestasi  
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
          <div className="title-text">Barang Impian</div>
        </div>
      </div>

      {/* Header Section */}
      <div className="header-container">
        <div className="profile-icon"></div>
        <div className="greeting-text">Hi, {username}</div>
        <div className="company-name">Pennywise</div>
        <div className="tagline">Manage Your Finances Easily</div>
      </div>

      {/* Result Message Display */}
      {resultMessage && <div className="result-message">{resultMessage}</div>}

      {/* Calculator Section */}
      <div className="calculator-container">
      {[
          { label: 'Mimpi kamu tercapai dalam', suffix: 'bulan lagi', fieldName: 'bulanLagi' },
          { label: 'Harga barang impianmu saat ini', prefix: 'Rp', fieldName: 'hargaBarang', autocomplete: 'off' },
          { label: 'Persentase DP (Down Payment)', suffix: '%', fieldName: 'persentaseDP', autocomplete: 'off' },
          { label: 'DP kamu setara dengan', prefix: 'Rp', fieldName: 'dpSetara' },
          { label: 'Persentase Pinjaman kamu', suffix: '%', fieldName: 'persentasePinjaman', autocomplete: 'off' },
          { label: 'Pokok Utang kamu setara dengan', prefix: 'Rp', fieldName: 'pokokUtang' },
          { label: 'Total uang yang kamu butuhkan untuk bayar DP', prefix: 'Rp', fieldName: 'totalUangDP' },
          { label: 'Uang yang kamu miliki saat ini untuk beli barang', prefix: 'Rp', fieldName: 'uangSaatIni', autocomplete: 'cc-number' },
          { label: 'Target investasi tiap bulan', prefix: 'Rp', fieldName: 'targetInvestasi', autocomplete: 'off' },
          { label: 'Kamu akan investasi di produk yang return-nya', suffix: '%/tahun', fieldName: 'returnInvestasi', autocomplete: 'off' },
          { label: 'Kamu akan rutin berinvestasi selama', suffix: 'bulan', fieldName: 'lamaInvestasi', autocomplete: 'off' },
        ].map((input, index) => (
        <div key={index} className={`input-group ${currentStep > index ? 'visible' : ''}`}>
        <span className="circle-icon"></span>
        <label className={`input-label ${currentStep === index + 1 ? 'animasi-teks' : ''}`}>
          {input.label}
        </label>
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
      </div>
    ))}

        <div className="send-button">
                <button 
                  className="submit-button" 
                  onClick={calculateInvestmentImpian} 
                  disabled={!isFormValid()} // Disable the button if the form is not valid
                >
                  Ayo lihat hasil strategimu
                </button>
          </div>


      </div>
    </div>
  );
};

export default BarangImpian;
import React, { useState, useEffect } from 'react';
import './HasilStrategi.css';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const HasilStrategi = () => {
  const location = useLocation();

  // Nilai default untuk input data jika tidak tersedia
  const inputData = location.state?.hasil || {
    uangSaatIni: 0,
    jumlahInvestasiBulanan: 0,
    returnInvestasi: 0,
    lamaInvestasi: 0,
    totalUangDibutuhkan: 0,
  };

  // State untuk menyimpan hasil dari API
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk memformat angka
  const formatNumber = (value) => {
    if (value === null || value === undefined) return '0';
    // Membulatkan ke integer dan menghilangkan .00 jika ada
    return Number(value).toLocaleString('id-ID', { maximumFractionDigits: 0 });
  };

  // Memanggil API untuk perhitungan
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:5000/calculate'; // URL API Flask

    const fetchData = async () => {
      try {
        console.log('Mengirim data ke API:', inputData);
        const response = await axios.post(apiUrl, {
          uangSaatIni: Number(inputData.uangSaatIni),
          targetInvestasi: Number(inputData.jumlahInvestasiBulanan),
          returnInvestasi: Number(inputData.returnInvestasi),
          waktu: Number(inputData.lamaInvestasi),
          uangCapai: Number(inputData.totalUangDibutuhkan),
        });

        if (response.data) {
          setHasil(response.data); // Menyimpan respons backend
        } else {
          throw new Error('Respons API tidak valid.');
        }
      } catch (err) {
        console.error('Error saat memanggil API:', err);
        setError(err.message || 'Terjadi kesalahan.');
      } finally {
        setLoading(false);
      }
    };

    // Validasi input sebelum memanggil API
    const isInputValid =
      inputData &&
      inputData.uangSaatIni >= 0 &&
      inputData.jumlahInvestasiBulanan >= 0 &&
      inputData.returnInvestasi > 0 &&
      inputData.lamaInvestasi > 0 &&
      inputData.totalUangDibutuhkan >= 0;

    if (isInputValid) {
      setLoading(true);
      fetchData();
    } else {
      setError('Input tidak lengkap atau tidak valid.');
      setLoading(false);
    }
  }, [inputData]);

  // Menampilkan loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Menampilkan error state
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Jika hasil API tidak ada
  if (!hasil) {
    return <div>No data available.</div>;
  }

  // Menentukan kelas header berdasarkan message
  const headerClass = hasil.message.includes('Selamat') ? 'success' : 'error';

  // Memastikan durasi tahun tidak menampilkan desimal
  const cleanMessage = hasil.message.replace(/(\d+\.\d+)( tahun)/g, (match, p1, p2) => {
    return `${Math.round(p1)}${p2}`; // Menghapus angka desimal dan membulatkan durasi
  });

  return (
    <div className="hasil-strategi-container">
      {/* Navigasi */}
      <div className="nav-container-hasilprediksi">
        <Link to="../" className="back-button">Back</Link>
        <div className="nav-title-hasilprediksi">
          <FontAwesomeIcon icon={faCalculator} className="calculator-icon" />
          <div className="title-text-hasilprediksi">Hasil Strategi Investasi</div>
        </div>
      </div>

      {/* Header */}
      <div className={`header-container-hasil ${headerClass}`}>
        <div className={headerClass === 'success' ? 'success-message' : 'error-message'}>
          {cleanMessage}
        </div>
      </div>

      {/* Input Pengguna */}
      <div className="user-input-container">
        <h2>Input Pengguna</h2>
        <p><strong>Uang Saat Ini:</strong> Rp {formatNumber(inputData.uangSaatIni)}</p>
        <p><strong>Investasi Bulanan:</strong> Rp {formatNumber(inputData.jumlahInvestasiBulanan)}</p>
        <p><strong>Return Investasi:</strong> {inputData.returnInvestasi}%/Tahun</p>
        <p><strong>Lama Investasi:</strong> {inputData.lamaInvestasi} Tahun</p>
        <p><strong>Target Uang:</strong> Rp {formatNumber(inputData.totalUangDibutuhkan)}</p>
      </div>

      {/* Hasil Investasi */}
      <div className="hasil-detail">
        <div className="hasil-detail-top">
          <h2>Hasil Investasi</h2>
          <p className="amount">Rp {formatNumber(hasil.hasilInvestasi)}</p>
        </div>
      </div>
    </div>
  );
};

export default HasilStrategi;

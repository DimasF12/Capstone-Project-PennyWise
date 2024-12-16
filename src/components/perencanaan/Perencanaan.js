import React from 'react';
import './perencanaan.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons'; 
import { faPersonCane } from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';

const Perencanaan = ({ username }) => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleFeatureClick = (feature) => {
    switch (feature) {
      case 'barangImpian':
        navigate('/BarangImpian'); // Replace with your actual route
        break;
      case 'danaDarurat':
        navigate('/DanaDarurat'); // Replace with your actual route
        break;
      case 'danaPensiun':
        navigate('/dana-pensiun'); // Replace with your actual route
        break;
      default:
        break;
    }
  };

  return (
    <div className="perencanaan-container">
      {/* Back Button */}
      <button className="perencanaan-back-button" onClick={() => navigate(-1)}>
        Kembali
      </button>

      {/* Header Section */}
      <div className="perencanaan-header">
        <div className="perencanaan-profile-icon"></div>
        <div className="perencanaan-greeting-text">Hi, {username}</div>
        <div className="perencanaan-company-name">Pennywise</div>
        <div className="perencanaan-tagline">Manage Your Finances Easily</div>
      </div>

      {/* Title */}
      <div className="perencanaan-section-title">Ayo Prediksi Target mu 😎</div>

      {/* Feature Cards */}
       <div className="perencanaan-feature-group">
        <div className="perencanaan-feature-box" onClick={() => handleFeatureClick('barangImpian')}>
          <div className="perencanaan-feature-icon">
            <FontAwesomeIcon icon={faCar} size='2xl' />
          </div>
          <div className="perencanaan-feature-text">Barang impian</div>
        </div>
        <div className="perencanaan-feature-box" onClick={() => handleFeatureClick('danaDarurat')}>
          <div className="perencanaan-feature-icon">
            <FontAwesomeIcon icon={faWallet} size="2xl" />
          </div>
          <div className="perencanaan-feature-text">Dana darurat</div>
        </div>
        <div className="perencanaan-feature-box" onClick={() => handleFeatureClick('danaPensiun')}>
          <div className="perencanaan-feature-icon">
            <FontAwesomeIcon icon={faPersonCane} size='2xl' />
          </div>
                <div className="perencanaan-feature-text">Dana pensiun</div>
            </div>
        </div>

    </div>
  );
};

export default Perencanaan;

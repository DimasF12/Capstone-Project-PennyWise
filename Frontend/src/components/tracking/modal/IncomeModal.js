import React from "react";
import "./IncomeModal.css";

const IncomeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Tambah Pemasukan</h2>

        <form>

          <div className="form-group">
            <label className="label-modal" htmlFor="amount">Jumlah pemasukan:</label>
            <input type="number" id="amount" ClassName="input" placeholder="Rp. XXXXXXX" />
          </div>

          <div className="form-group">
            <label className="label-modal" htmlFor="date">Tanggal:</label>
            <input type="date" id="date" />
          </div>

          <div className="form-group">
            <label className="label-modal" htmlFor="info">Deskripsi</label>
            <div className="info-buttons">
              <button
                type="button"
                className="info-button"
                onClick={() => (document.getElementById("desc").value = "Gaji")}
              >
                Gaji
              </button>
              <button
                type="button"
                className="info-button"
                onClick={() =>
                  (document.getElementById("desc").value = "Pemasukan Tambahan")
                }
              >
                Pemasukan Tambahan
              </button>
              <button
                type="button"
                className="info-button"
                onClick={() => (document.getElementById("desc").value = "Investasi")}
              >
                Investasi
              </button>
            </div>
          </div>

          <button type="submit" className="submit-modal-button">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default IncomeModal;

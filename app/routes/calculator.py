from flask import Blueprint, request, jsonify
from app.service.calculator import calculate_future_value, calculate_required_monthly_investment, calculate_required_duration

# Membuat Blueprint untuk rute investasi
investment_bp = Blueprint('investment', __name__)

@investment_bp.route('/calculate', methods=['POST'])
def calculate():
    try:
        # Ambil data dari request
        data = request.json

        # Validasi input
        initial_amount = float(data.get('uangSaatIni'))
        monthly_investment = float(data.get('targetInvestasi'))
        annual_return_rate = float(data.get('returnInvestasi'))
        years = int(data.get('waktu'))
        target_amount = float(data.get('uangCapai'))

        # Hitung nilai masa depan
        future_value = calculate_future_value(initial_amount, monthly_investment, annual_return_rate, years)

        # Jika nilai masa depan lebih besar atau sama dengan target, beri hasil
        if future_value >= target_amount:
            result = {
                'message': f"Selamat! Anda akan memiliki Rp {future_value:.2f} setelah {years} tahun, yang memenuhi target Anda."
            }
        else:
            solution = data.get('solution')  # Ambil solusi dari request
            if solution == "1":
                required_monthly_investment = calculate_required_monthly_investment(initial_amount, target_amount, annual_return_rate, years)
                result = {
                    'message': f"Untuk mencapai target Rp {target_amount}, Anda perlu berinvestasi Rp {required_monthly_investment:.2f} setiap bulan."
                }
            elif solution == "2":
                required_years = calculate_required_duration(initial_amount, monthly_investment, annual_return_rate, target_amount)
                result = {
                    'message': f"Untuk mencapai target Rp {target_amount}, Anda perlu berinvestasi selama {required_years:.2f} tahun."
                }
            else:
                result = {
                    'message': "Pilihan tidak valid. Silakan masukkan 1 atau 2."
                }

        return jsonify(result)

    except (ValueError, TypeError) as e:
        # Menangani kesalahan input
        return jsonify({
            'message': 'Terjadi kesalahan pada input yang diberikan.',
            'error': str(e),
            'code': 400
        }), 400

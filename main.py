from flask import Flask, request, jsonify
from flask_cors import CORS
from app.service.calculator import calculate_future_value, calculate_required_monthly_investment, calculate_required_duration

app = Flask(__name__)
CORS(app)  # Mengaktifkan CORS untuk seluruh aplikasi

# Fungsi untuk memeriksa strategi investasi
def check_investment_strategy(initial_amount, monthly_investment, annual_return_rate, years, target_amount):
    try:
        # Hitung nilai masa depan berdasarkan investasi yang ada
        future_value = calculate_future_value(initial_amount, monthly_investment, annual_return_rate, years)
        
        # Jika nilai masa depan memenuhi atau melebihi target
        if future_value >= target_amount:
            return f"Selamat! Anda akan memiliki Rp {future_value:,.2f} setelah {years} tahun, yang memenuhi target Anda."
        
        # Jika nilai masa depan tidak memenuhi target, hitung kebutuhan lain
        else:
            required_monthly_investment = calculate_required_monthly_investment(
                initial_amount, target_amount, annual_return_rate, years)
            required_duration = calculate_required_duration(
                initial_amount, monthly_investment, annual_return_rate, target_amount)
            
            # Berikan saran kepada pengguna
            return (
                f"Strategi Anda belum cocok. Anda memerlukan investasi bulanan sebesar "
                f"Rp {required_monthly_investment:,.2f} setiap bulan selama {years} tahun, atau perpanjang durasi "
                f"hingga {required_duration:.2f} tahun untuk mencapai target."
            )
    except Exception as e:
        return f"Terjadi kesalahan: {e}"

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        # Mengambil data dari request
        data = request.get_json()

        # Memastikan bahwa data yang dibutuhkan ada
        required_fields = ['initialAmount', 'monthlyInvestment', 'annualReturnRate', 'years', 'targetAmount']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing {field}'}), 400

        # Mendapatkan nilai dari data
        initial_amount = data['initialAmount']
        monthly_investment = data['monthlyInvestment']
        annual_return_rate = data['annualReturnRate']
        years = data['years']
        target_amount = data['targetAmount']

        # Menyusun pesan berdasarkan hasil strategi investasi
        message = check_investment_strategy(initial_amount, monthly_investment, annual_return_rate, years, target_amount)

        # Mengirimkan hasil perhitungan bersama pesan
        return jsonify({'message': message}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

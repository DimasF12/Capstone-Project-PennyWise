from flask import Flask, request, jsonify
from flask_cors import CORS  # Impor flask-cors
from app.service.calculator import calculate_future_value, calculate_required_monthly_investment, calculate_required_duration

app = Flask(__name__)

# Aktifkan CORS di aplikasi Flask, hanya dari localhost:3000
CORS(app, resources={r"/calculate": {"origins": "http://localhost:3000"}})

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        print('Data yang diterima:', data)  # Debug: Cek data yang diterima

        # Memastikan bahwa data yang dibutuhkan ada
        required_fields = ['uangSaatIni', 'targetInvestasi', 'returnInvestasi', 'waktu', 'uangCapai']
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

        initial_amount = float(data['uangSaatIni'])
        monthly_investment = float(data['targetInvestasi'])
        annual_return_rate = float(data['returnInvestasi'])
        years = int(data['waktu'])
        target_amount = float(data['uangCapai'])

        future_value = calculate_future_value(initial_amount, monthly_investment, annual_return_rate, years)

        if future_value >= target_amount:
            return jsonify({
                'message': f"Selamat! Anda akan memiliki Rp {future_value:,.2f} setelah {years} tahun, yang memenuhi target Anda.",
                'hasilInvestasi': future_value,
                'totalUangDibutuhkan': target_amount
            }), 200
        else:
            required_monthly_investment = calculate_required_monthly_investment(initial_amount, target_amount, annual_return_rate, years)
            required_duration = calculate_required_duration(initial_amount, monthly_investment, annual_return_rate, target_amount)
            return jsonify({
                'message': (
                    f"Strategi Anda belum cocok. Anda memerlukan investasi bulanan sebesar "
                    f"Rp {required_monthly_investment:,.2f} setiap bulan selama {years} tahun, atau perpanjang durasi "
                    f"hingga {required_duration:.2f} tahun untuk mencapai target."
                ),
                'hasilInvestasi': future_value,
                'totalUangDibutuhkan': target_amount
            }), 200
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug error
        return jsonify({'error': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

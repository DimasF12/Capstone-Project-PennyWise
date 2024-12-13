from flask import Flask, request, jsonify
from flask_cors import CORS
from app.service.calculator import calculate_future_value, calculate_required_monthly_investment, calculate_required_duration

app = Flask(__name__)
CORS(app)  # Mengaktifkan CORS untuk seluruh aplikasi

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

        # Lakukan perhitungan menggunakan fungsi yang sudah dibuat di calculator.py
        future_value = calculate_future_value(initial_amount, monthly_investment, annual_return_rate, years)
        required_monthly_investment = calculate_required_monthly_investment(initial_amount, target_amount, annual_return_rate, years)
        required_duration = calculate_required_duration(initial_amount, monthly_investment, annual_return_rate, target_amount)

        # Mengirimkan hasil perhitungan
        return jsonify({
            'futureValue': future_value,
            'requiredMonthlyInvestment': required_monthly_investment,
            'requiredDuration': required_duration
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

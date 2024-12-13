from flask import Blueprint, request, jsonify
from app.service.calculator import calculate_future_value

calculator_bp = Blueprint('calculator', __name__)

@calculator_bp.route('/calculator', methods=['POST'])
def calculate():
    data = request.json
    initial_amount = float(data.get('initialAmount', 0))
    monthly_investment = float(data.get('monthlyInvestment', 0))
    annual_return_rate = float(data.get('annualReturnRate', 0))
    years = int(data.get('years', 0))
    target_amount = float(data.get('targetAmount', 0))

    future_value = calculate_future_value(initial_amount, monthly_investment, annual_return_rate, years)

    if future_value >= target_amount:
        return jsonify({"message": f"Selamat! Anda akan memiliki Rp {future_value:,.2f} setelah {years} tahun."})
    else:
        return jsonify({"message": f"Target Anda tidak tercapai. Nilai masa depan hanya Rp {future_value:,.2f}."})

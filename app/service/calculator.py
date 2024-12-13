# services/investment_service.py

def calculate_future_value(initial_amount, monthly_investment, annual_return_rate, years):
    try:
        current_amount = initial_amount
        monthly_return_rate = annual_return_rate / 12 / 100
        total_months = years * 12

        for _ in range(total_months):
            current_amount += monthly_investment
            current_amount *= (1 + monthly_return_rate)
        return current_amount
    except Exception as e:
        raise ValueError(f"Error calculating future value: {e}")

def calculate_required_monthly_investment(initial_amount, target_amount, annual_return_rate, years):
    try:
        monthly_return_rate = annual_return_rate / 12 / 100
        total_months = years * 12
        fv_without_investment = initial_amount * (1 + monthly_return_rate) ** total_months
        future_value_needed = target_amount - fv_without_investment

        required_monthly_investment = future_value_needed * monthly_return_rate / ((1 + monthly_return_rate) ** total_months - 1)
        return required_monthly_investment
    except Exception as e:
        raise ValueError(f"Error calculating required monthly investment: {e}")

def calculate_required_duration(initial_amount, monthly_investment, annual_return_rate, target_amount):
    try:
        current_amount = initial_amount
        monthly_return_rate = annual_return_rate / 12 / 100
        months = 0

        while current_amount < target_amount:
            current_amount += monthly_investment
            current_amount *= (1 + monthly_return_rate)
            months += 1

        return months / 12  # Mengembalikan hasil dalam tahun
    except Exception as e:
        raise ValueError(f"Error calculating required duration: {e}")

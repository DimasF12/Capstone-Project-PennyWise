def calculate_future_value(initial_amount, monthly_investment, annual_return_rate, years):
    current_amount = initial_amount
    monthly_return_rate = annual_return_rate / 12 / 100
    total_months = years * 12

    for _ in range(total_months):
        current_amount += monthly_investment
        current_amount *= (1 + monthly_return_rate)

    return current_amount

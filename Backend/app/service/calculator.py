import math

def calculate_future_value(initial_amount, monthly_investment, annual_return_rate, years):
    try:
        # Menyusun jumlah investasi awal
        current_amount = initial_amount
        monthly_return_rate = annual_return_rate / 12 / 100  # Tingkat pengembalian bulanan
        total_months = years * 12  # Total bulan dalam periode waktu yang ditentukan

        # Iterasi per bulan untuk menghitung future value
        for _ in range(total_months):
            current_amount += monthly_investment  # Menambahkan investasi bulanan
            current_amount *= (1 + monthly_return_rate)  # Menghitung return investasi

        # Pembulatan ke angka bulat terbesar
        return math.ceil(current_amount)
    except Exception as e:
        raise ValueError(f"Error calculating future value: {e}")

def calculate_required_monthly_investment(initial_amount, target_amount, annual_return_rate, years):
    try:
        # Menghitung tingkat pengembalian bulanan
        monthly_return_rate = annual_return_rate / 12 / 100
        total_months = years * 12  # Menghitung total bulan

        # Future value tanpa investasi bulanan
        fv_without_investment = initial_amount * (1 + monthly_return_rate) ** total_months
        future_value_needed = target_amount - fv_without_investment  # Sisa nilai yang perlu dicapai

        # Jika sisa nilai yang perlu dicapai lebih kecil dari 0, kembalikan investasi bulanan yang sangat kecil atau 0
        if future_value_needed <= 0:
            return 0

        # Menghitung investasi bulanan yang diperlukan
        required_monthly_investment = future_value_needed * monthly_return_rate / ((1 + monthly_return_rate) ** total_months - 1)

        # Pembulatan ke angka bulat terbesar
        return math.ceil(required_monthly_investment)
    except Exception as e:
        raise ValueError(f"Error calculating required monthly investment: {e}")

def calculate_required_duration(initial_amount, monthly_investment, annual_return_rate, target_amount):
    try:
        current_amount = initial_amount
        monthly_return_rate = annual_return_rate / 12 / 100
        months = 0

        # Loop untuk mencari berapa bulan yang diperlukan untuk mencapai target
        while current_amount < target_amount:
            current_amount += monthly_investment
            current_amount *= (1 + monthly_return_rate)
            months += 1

        # Pembulatan durasi ke angka bulat (tahun)
        return math.ceil(months / 12)  # Pastikan durasi di dalam tahun adalah integer
    except Exception as e:
        raise ValueError(f"Error calculating required duration: {e}")


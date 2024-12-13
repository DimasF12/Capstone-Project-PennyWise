from flask import Flask, render_template, request
import pandas as pd
import joblib

app = Flask(__name__)

# Load model, encoders, and scaler
label_encoders = {
    'Category': joblib.load('category_label_encoder.pkl'),
    'Reason': joblib.load('reason_label_encoder.pkl'),
    'Mood': joblib.load('mood_label_encoder.pkl')
}

scaler = joblib.load('scaler.pkl')
best_rf = joblib.load('random_forest_model.pkl')

def handle_pengeluaran(amount, category, reason, mood):
    category_encoded = label_encoders['Category'].transform([category])[0]
    reason_encoded = label_encoders['Reason'].transform([reason])[0]
    mood_encoded = label_encoders['Mood'].transform([mood])[0]

    input_data = pd.DataFrame([[category_encoded, reason_encoded, mood_encoded]],
                              columns=['Category', 'Reason', 'Mood'])

    input_scaled = scaler.transform(input_data)

    predicted_amount = best_rf.predict(input_scaled)[0]

    recommendations = []
    if category == 'Tersier':
        recommendations.append("Pengeluaran pada kategori Tersier (seperti hiburan dan barang mewah) bisa sangat menggoda. "
                              "Pertimbangkan untuk mengevaluasi kembali pengeluaran ini, terutama jika tidak mendukung tujuan keuangan jangka panjang.")
    elif category == 'Sekunder':
        recommendations.append("Pengeluaran untuk kategori Sekunder (kebutuhan sekunder) masih bisa dikendalikan. "
                              "Pastikan bahwa pengeluaran ini tidak melebihi anggaran bulanan Anda untuk kebutuhan penting.")
    elif category == 'Primer':
        recommendations.append("Pengeluaran untuk kategori Primer (kebutuhan primer) menunjukkan prioritas yang baik. "
                              "Pastikan Anda tidak mengabaikan tabungan atau investasi yang bisa mendukung tujuan jangka panjang.")
    elif category == 'Tak Terduga':
        recommendations.append("Pengeluaran pada kategori Tak Terduga mungkin sulit dihindari, tetapi penting untuk memiliki dana darurat. "
                              "Evaluasi kembali kebutuhan ini dan rencanakan tabungan untuk menghadapi situasi tak terduga di masa depan.")
    else:
        recommendations.append("Kategori tidak dikenal. Mohon pastikan data pengeluaran memiliki kategori yang valid.")


    if reason == 'Luxury':
        recommendations.append("Pengeluaran untuk alasan Luxury bisa memanjakan, namun pastikan bahwa Anda memiliki dana darurat sebelum membeli barang mewah.")
    elif reason == 'Irasional':
        recommendations.append("Pengeluaran yang didorong oleh alasan Irasional dapat menambah tekanan finansial. "
                              "Cobalah untuk meninjau kembali keputusan pengeluaran Anda dan pastikan tidak mengganggu tujuan keuangan.")
    elif reason == 'Kewajiban':
        recommendations.append("Pengeluaran untuk kewajiban (seperti cicilan) adalah bagian dari tanggung jawab keuangan. "
                              "Pastikan Anda memprioritaskan ini agar tidak mengganggu arus kas.")
    elif reason == 'Esensial':
        recommendations.append("Pengeluaran untuk alasan Esensial mencerminkan kebutuhan mendasar. "
                              "Pastikan Anda mengelola dengan baik untuk memenuhi kebutuhan penting tanpa mengabaikan tabungan.")
    elif reason == 'Gaya Hidup':
        recommendations.append("Pengeluaran yang berkaitan dengan Gaya Hidup harus dikendalikan agar tidak melebihi anggaran. "
                              "Pastikan pengeluaran ini sesuai dengan kemampuan keuangan Anda.")
    elif reason == 'Teratur':
        recommendations.append("Pengeluaran Teratur (seperti tagihan bulanan) perlu diprioritaskan untuk menjaga kestabilan finansial.")
    elif reason == 'Terencana':
        recommendations.append("Pengeluaran Terencana menunjukkan pengelolaan keuangan yang baik. "
                              "Pastikan Anda terus mempertahankan kebiasaan ini untuk mencapai tujuan keuangan.")
    elif reason == 'Sial':
        recommendations.append("Pengeluaran karena alasan Sial mungkin sulit dihindari. "
                              "Pertimbangkan untuk membangun dana darurat agar lebih siap menghadapi situasi mendadak di masa depan.")
    else:
        recommendations.append("Alasan tidak dikenal. Mohon pastikan data pengeluaran memiliki alasan yang valid.")

    if mood == 'Buruk':
        recommendations.append("Ketika mood Anda buruk, keputusan pengeluaran bisa dipengaruhi. "
                              "Cobalah untuk menunda pembelian barang tidak penting hingga Anda merasa lebih baik.")
    elif mood == 'Tidak Baik':
        recommendations.append("Pengeluaran yang dilakukan dalam kondisi mood yang tidak baik bisa menambah beban emosional. "
                              "Pertimbangkan untuk mengatur ulang anggaran dan meninjau kembali pengeluaran Anda.")
    elif mood == 'Senang':
        recommendations.append("Mood positif dapat mendorong pengeluaran yang lebih bijak. "
                              "Teruskan kebiasaan baik ini dan pertahankan anggaran Anda.")
    elif mood == 'Baik':
        recommendations.append("Ketika mood Anda baik, ini adalah waktu yang tepat untuk mengevaluasi anggaran dan mengalokasikan dana ke tabungan atau investasi.")
    else:
        recommendations.append("Mood tidak dikenal. Mohon pastikan data mood memiliki kategori yang valid.")

    if amount > predicted_amount:
        difference = amount - predicted_amount
        formatted_difference = "Rp {:,.0f}".format(difference)
        recommendations.append(f"Pengeluaran Anda lebih tinggi dari perkiraan. Anda mungkin perlu mengevaluasi kembali pengeluaran ini, "
                               f"mengurangi pengeluaran sebesar {formatted_difference}, dan fokus pada tujuan finansial jangka panjang.")

    elif amount < predicted_amount:
        recommendations.append(f"Pengeluaran Anda lebih rendah dari perkiraan. Ini adalah hal yang baik! Anda bisa menabung atau mengalokasikan dana lebih "
                               "untuk investasi atau tabungan pensiun.")
    else:
        recommendations.append("Pengeluaran Anda sesuai dengan prediksi. Pertahankan!")

    if amount == predicted_amount:
        recommendations.append("Pengeluaran Anda sesuai dengan prediksi. Anda berada di jalur yang benar untuk mencapai tujuan keuangan Anda.")
    
    recommendations.append("Pertimbangkan untuk menyisihkan sebagian pengeluaran Anda ke dalam tabungan atau investasi, terutama untuk tujuan jangka panjang "
                           "seperti dana pensiun atau impian masa depan.")

    return predicted_amount, recommendations

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            print(request.form)
          
            amount = float(request.form['amount'])
            category = request.form['category']
            reason = request.form['reason']
            mood = request.form['mood']

            predicted_amount, recommendations = handle_pengeluaran(amount, category, reason, mood)

            # Format uang idr
            formatted_predicted_amount = "Rp {:,.0f}".format(predicted_amount)

            return render_template('index.html',
                                   predicted_amount=formatted_predicted_amount,
                                   recommendations=recommendations,
                                   submitted=True)
        except Exception as e:
            print(f"Error: {e}")
            return render_template('index.html', error=str(e), submitted=False)

    return render_template('index.html', submitted=False)

if __name__ == '__main__':
    app.run(debug=True)

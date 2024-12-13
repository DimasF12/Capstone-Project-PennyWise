from flask import Flask, jsonify
from flask_cors import CORS
from app.routes.calculator import investment_bp

app = Flask(__name__)
CORS(app)  # Mengizinkan CORS untuk akses dari frontend

# Mendaftarkan Blueprint untuk rute investasi
app.register_blueprint(investment_bp)

# Rute untuk pengecekan status server
@app.route('/status', methods=['GET'])
def check_status():
    return jsonify({
        'status': 'success',
        'message': 'Server is running',
        'code': 200
    })

if __name__ == '__main__':
    app.run(debug=True)

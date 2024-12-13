from flask import Flask
from config import config

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = config.SECRET_KEY
    app.config['ENV'] = config.FLASK_ENV

    # Tambahkan rute
    from app.routes.calculator import calculator_bp
    app.register_blueprint(calculator_bp, url_prefix='/api')

    return app

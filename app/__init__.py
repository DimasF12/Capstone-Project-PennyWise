# app/__init__.py

from flask import Flask
from app.routes.calculator import investment_bp

def create_app():
    app = Flask(__name__)

    # Mendaftarkan Blueprint
    app.register_blueprint(investment_bp, url_prefix='/investment')

    return app

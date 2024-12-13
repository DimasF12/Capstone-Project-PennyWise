import os
from dotenv import load_dotenv

# Memuat file .env
load_dotenv()

class Config:
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')
    SECRET_KEY = os.getenv('SECRET_KEY', 'defaultsecret')
    DATABASE_URL = os.getenv('DATABASE_URL')
    API_BASE_URL = os.getenv('API_BASE_URL')

# Gunakan config ini di aplikasi
config = Config()

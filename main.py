from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Home Page!"

@app.route('/calculator', methods=['GET', 'POST'])
def calculator():
    if request.method == 'POST':
        data = request.json
        return f"POST data received: {data}"
    return "GET request to Calculator"

if __name__ == '__main__':
    app.run(debug=True)

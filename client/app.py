from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

ciudadActual = "";

@app.route('/')
def index():
    # Serve the HTML page that contains the frontend
    return render_template('index.html')

@app.route('/get-rutas')
def get_rutas():
    # Call the corresponding Node.js backend API for '/getRutas'
    response = requests.get('http://localhost:3000/getRutas')
    return jsonify(response.json()) if response.ok else ('', 502)

@app.route('/get-siguiente-ciudad')
def get_siguiente_ciudad():
    # Get parameters from frontend
    origen = request.args.get('origen', type=int)
    destino = request.args.get('destino', type=int)

    # Call the corresponding Node.js backend API for '/getSiguienteCiudad'
    response = requests.get('http://localhost:3000/getSiguienteCiudad', params={'origen': origen, 'destino': destino})
    print(response.json)
    return jsonify(response.json()) if response.ok else ('', 502)

if __name__ == '__main__':
    app.run(debug=True)


import requests
# Este método llama al endpoint que tiene como respuesta el trayecto más corto entre 
# las 2 ciudades que introduce el usuario como parámetros
def viajar():
    response = requests.get('http://localhost:3000/getCiudades')
    ciudades = (response.json())
    
    print("Introduce ciudad de origen:")
    ciudad_api = {ciudad['id']: ciudad['nombre'] for ciudad in ciudades}
    
    ciudad_nombres = {nombre: id for id, nombre in ciudad_api.items()}

    for id, nombre in ciudad_api.items():
        print(f"ID {id}: {nombre}")
    
    origen = input()
    print("Introduce ciudad de destino:")
    destino = input()
    while(True):
        response = requests.get('http://localhost:3000/getSiguienteCiudad', params={'origen': origen, 'destino': destino})
        print(response.json())
        if (len(response.json()["Trayecto"]) == 2):
            break;
        
        origen = ciudad_nombres.get(response.json()["SiguienteCiudad"], "City not found")
        input()

if __name__ == '__main__':
    viajar()
    

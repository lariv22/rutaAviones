import Ruta from '../models/rutaModel.js';
import {Graph} from '../dijsktra/graph.js';
var jsonRutas = [];

export const GetRutas = async(req, res) => {
    try {
        const rutas = await Ruta.findAll();
        jsonRutas = rutas;
        res.json(rutas);
    } catch (error) {
        console.log(error);
    }
}

export const GetSiguienteCiudad = async(req, res) => {
    try {
        const rutas = await Ruta.findAll();
        const graph = new Graph();
        graph.calcularSiguiente(rutas);

        res.json(rutas);
    } catch (error) {
        console.log(error);
    }
}
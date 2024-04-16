import Ruta from '../models/rutaModel.js';
import {Graph} from '../dijsktra/graph.js';

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
        const origen = req.query.origen;
        const destino = req.query.destino;
        
        if(!origen || !destino) {
            return res.status(400).json({error: "Falta ubicación de origen y/o destino"});
        }

        const rutas = await Ruta.findAll();
        const graph = new Graph();
        res.json(graph.calcularSiguiente(rutas, origen, destino));

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
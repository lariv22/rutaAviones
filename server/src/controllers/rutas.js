import Ruta from '../models/rutaModel.js';
import {Graph} from '../dijsktra/graph.js';
import Ciudad from '../models/ciudadModel.js';

export const GetCiudades = async(req, res) => {
    try {
        const ciudades = await Ciudad.findAll();
        res.json(ciudades);
    } catch (error) {
        console.log(error);
    }
}

export const GetRutas = async(req, res) => {
    try {
        const rutas = await Ruta.findAll();
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
        var ciudades = new Ciudad();
        ciudades = await Ciudad.findAll();
        const rutas = await Ruta.findAll();
        const graph = new Graph();
        res.json(graph.calcularSiguiente(rutas, origen, destino, ciudades));

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
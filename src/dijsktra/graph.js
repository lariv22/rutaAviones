import { Node } from "./node.js";
export class Graph {
    constructor() {
        this.nodes = [];
    }

    addNode(value, destino, animales, tiempo, trafico) {
        let nodeExistente = this.nodeExiste(value);

        if(!nodeExistente){
            let node = new Node(value);
            this.nodes.push(node);
            console.log("Node no existe, se crea uno nuevo nodo:" + value);
        }else{
            console.log("Add Edge");
            nodeExistente.addEdge(destino, (animales + trafico + tiempo));
            console.log("Node Existente origen: " + nodeExistente.value, " Destino: " + destino +  " peso: " + (animales + trafico + tiempo))
        }
    }
    nodeExiste(value) {
        return this.nodes.find(node => node.value === value);
    }

    calcularSiguiente(jsonRutas){
        const origen = 1;
        const destino = 6;
        const rutas = jsonRutas;
    
        const graph = new Graph();
    
        this.llenarGraph(graph, rutas);
    
        const camino = this.dijkstraAlgorithm(graph);

        console.log(camino);
    }
    
    llenarGraph(graph, rutas) {
        rutas.forEach(element => {
            console.log("Element origen: " + element.origen + " destino:" + element.destino)
            graph.addNode(element.origen, element.destino, element.animales, element.tiempo, element.trafico);
        })
    };
    
    dijkstraAlgorithm(graph) {
        const costs = Object.assign({end: Infinity}, graph.start);
        const parents = {end: null};
        const processed = [];
    
        let node = this.findLowestCostNode(costs, processed);
    
        while (node) {
            let cost = costs[node];
            let children = graph[node];
            for (let n in children) {
                let newCost = cost + children[n];
                if (!costs[n] || costs[n] > newCost) {
                    costs[n] = newCost;
                    parents[n] = node;
                }
            }
            processed.push(node);
            node = this.findLowestCostNode(costs, processed);
        }
    
        let optimalPath = ['end'];
        let parent = parents.end;
        while (parent) {
            optimalPath.push(parent);
            parent = parents[parent];
        }
        optimalPath.reverse();
    
        return {distance: costs.end, path: optimalPath};
    };
    
    findLowestCostNode(costs, processed) {
        return Object.keys(costs).reduce((lowest, node) => {
            if (lowest === null || costs[node] < costs[lowest]) {
                if (!processed.includes(node)) {
                    lowest = node;
                }
            }
            return lowest;
        }, null);
    };
}



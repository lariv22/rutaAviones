import { Node } from "./node.js";
export class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(value) {
        //Compruba si existe el nodo antes de añadir
        if (!this.nodes.has(value)) {
            this.nodes.set(value, new Node(value));
        }
    }

    addEdge(origen, destino, peso) {
        //Crea ,si no hay nodo con valor EQ origen
        if (!this.nodes.has(origen)) {
            this.addNode(origen);
        }
        //Crea ,si no hay nodo con valor EQ destino
        if (!this.nodes.has(destino)) {
            this.addNode(destino);
        }
        // Añade vertice al nodo de valor origen
        this.nodes.get(origen).addEdge(destino, peso);
        // Añade vertice al nodo de valor destino también para que sea bidireccional
        this.nodes.get(destino).addEdge(origen, peso);
    }

    llenarGraph(graph, jsonRutas) {
        jsonRutas.forEach(ruta => {
            graph.addNode(ruta.origen);
            graph.addNode(ruta.destino);
            graph.addEdge(ruta.origen, ruta.destino, ruta.tiempo);
        });
    }

    calcularSiguiente(jsonRutas) { //Falta Poner origen y destino desde la consulta de cliente
        const origen = '5';
        const destino = '9';
        let graph = new Graph();

        graph.llenarGraph(graph, jsonRutas);
        console.log(graph);
        const paths = this.DijkstraShortestPath(graph.transformToList(), origen, destino);
        
        return paths; // Devuelve la ruta y la distancia/peso total
    }

    transformToList() {
        //Convierte el mapa en una lista adyacente, la cual se recorre despues mas facilmente
        let graph = {};
        this.nodes.forEach((node, key) => {
            graph[key] = {};//Para cada nodo asigna una lista de rutas
            Object.entries(node.edges).forEach(([destino, peso]) => {
                graph[key][destino] = peso; //Relaciona cada origen con una ruta(destino/peso)
            });
        });
        return graph;
    }

    DijkstraShortestPath(graph, origen, destino) {
        let distances = {}; // Objeto para almacenar la distancia más corta conocida desde el inicio a cada nodo
        let prev = {};      // Objeto para almacenar el predecesor de cada nodo en el camino
        let queue = [];     // Array para actuar como una cola de prioridad
    
        // Inicializa las distancias y la cola
        for (const node in graph) {
            distances[node] = Infinity; // Comienza con una distancia infinita para todos los nodos
            queue.push(node);           // Añade cada nodo a la cola
        }
    
        distances[origen] = 0; // La distancia desde el inicio hasta sí mismo es siempre 0
    
        // Continúa procesando mientras queden nodos en la cola
        while (queue.length) {
            let current = this.extractMin(queue, distances); // Extrae el nodo con la distancia más pequeña
    
            // Interrumpe el bucle si la distancia más pequeña es infinita (nodo inalcanzable)
            if (distances[current] === Infinity) {
                console.log(`Se encontró un nodo inalcanzable, interrumpidestinoo el bucle.`);
                break;
            }
    
            // Verifica si el nodo actual es el destino
            if (current === destino) {
                let path = []; // Array para almacenar el camino
                let step = destino;
                // Retrocede desde el nodo destino hasta el nodo inicial
                while (prev[step] !== undefined) {
                    path.unshift(step);
                    step = prev[step];
                }
                // Incluye el nodo inicial en el camino
                if (path.length > 0) path.unshift(origen);
                // Devuelve el camino y la distancia al nodo final
                return { path, distance: distances[destino] };
            }
    
            // Actualiza las distancias para cada nodo adyacente
            for (const [neighbor, peso] of Object.entries(graph[current])) {
                let alt = distances[current] + peso;
                // Verifica si el nuevo camino al vecino es más corto
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt; // Actualiza la distancia
                    prev[neighbor] = current;  // Actualiza el predecesor
                }
            }
        }
    
        // Si no se encontró un camino, devuelve un camino vacío y una distancia infinita
        return { path: [], distance: Infinity };
    }

    extractMin(queue, distances) {
        let minIndex = 0;
        for (let i = 1; i < queue.length; i++) {
            if (distances[queue[i]] < distances[queue[minIndex]]) {
                minIndex = i;
            }
        }
        return queue.splice(minIndex, 1)[0]; // Remove and return the element at minIndex
    }
    
}

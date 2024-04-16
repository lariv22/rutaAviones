export class Node {
    constructor(origen){
        this.origen = origen;
        this.edges = {};  
    }

    addEdge(destino, peso) {
        this.edges[destino] = peso; 
    }
}

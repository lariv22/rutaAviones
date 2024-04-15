export class Node {
    constructor(value){
        this.value = value;
        this.edges = [];
    }

    addEdge(value, weight) {
        this.edges.push([value, weight]);
    }
}


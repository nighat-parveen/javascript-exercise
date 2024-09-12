class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if(this.adjacencyList[vertex]) return;
        this.adjacencyList[vertex] = [];
    }
    removeVertex(vertex) {
        if(!this.adjacencyList[vertex]) return;
        while(this.adjacencyList[vertex].length) {
            let ele = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, ele);
        }
        delete this.adjacencyList[vertex];
    }
    addEdge(src, dest) {
        if(this.adjacencyList[src]) {
            this.adjacencyList[src].push(dest);
        }
        if(this.adjacencyList[dest]) {
            this.adjacencyList[dest].push(src);
        }
    }

    filterItem (list,item) {
        return list?.filter((ele) => ele!==item);
    }

    removeEdge(src, dest) {

        if(this.adjacencyList[src]) {
            this.adjacencyList[src] = filterItem(this.adjacencyList[src], dest);
            
        }
        if(this.adjacencyList[dest]) {
            this.adjacencyList[dest] = filterItem(this.adjacencyList[dest], src);
        }
    }

    display() {
        for(let item in this.adjacencyList) {
            console.log(`${item} => ${this.adjacencyList[item].join(' ')}`);
            console.log('\n');
        }
    }

    findBFS() {
        let visited = {};
        let ans = [];
        for(let item in this.adjacencyList) {
            if(!visited[item]) {
                visited[item] = false;
                this.breadFirstSearch(visited, item, ans);
            }
        }
        return ans;
    }

    
    breadFirstSearch(visited, nodeItem, ans) {
        let queue = [nodeItem]; 
        
        while(queue.length) {
            let current = queue.shift();
            if(visited[current]) continue;
            ans.push(current);
            visited[current] = true;
            for(let item in this.adjacencyList[current]) {
                if(!visited[item]) {
                    queue.push(this.adjacencyList[current][item]);
                }
            }
            
        }
    }

    findDFS() {
        let ans = [];
        let visited = {};
        for(let item in this.adjacencyList){
            if(!visited[item]) {
                visited[item] = false;
                this.depthFirstSearch(item, visited, ans);

            }
        }
        return ans;
    }


    depthFirstSearch(node, visited, ans) {
        visited[node] = true;
        ans.push(node);
        for(let item of this.adjacencyList[node]){
            if(!visited[item]){
                this.depthFirstSearch(item, visited, ans);
            }
        }
    }

    callDetectCycleBFS(visited, item, parent) {
       parent[item] = null;
        visited[item] = true;
        let queue= [item];

        while(queue.length) {
            let current = queue.shift();
            for(let adjItem of this.adjacencyList[current]) {
                if(!visited[adjItem]) {
                    visited[adjItem] = true;
                    parent[adjItem] = current;
                    queue.push(adjItem);
                }

                else if(parent[current]!==adjItem) {

                    return true;
                }
            }
        }
        return false;
    }


    // detect cycled Graph in BFS
    detectCycleBFS() {
        let visited = {};
        let parent = {}
        for(let item in this.adjacencyList) {
            if(!visited[item]) {
                visited[item] = false;
                if(this.callDetectCycleBFS(visited, item, parent)) {
                    return true;
                }
            }
        }
        return false;
    }

};



const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('H');
graph.addVertex('I');



graph.addEdge('A', 'B');
graph.addEdge('B', 'C')
;
graph.addEdge('D', 'E');

graph.addEdge('E', 'F');

graph.addEdge('F', 'G');

graph.addEdge('G', 'H');

graph.addEdge('H', 'E');

graph.addEdge('I', 'G');



graph.display();
// const ans = graph.findBFS();
// console.log(ans);

// const dfsResult = graph.findDFS();
// console.log(dfsResult);

const bfsResult = graph.detectCycleBFS();
console.log(bfsResult);
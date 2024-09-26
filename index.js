class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if(this.adjacencyList[vertex]) return;
        this.adjacencyList[vertex] = [];
    }

    addDEdge(src, dest){
        if(this.adjacencyList[src]){
            this.adjacencyList[src].push(dest);
        } 
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
        // console.log(this.adjacencyList);
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

    callDCycleDetection(node, visited, dfs_visited) {
        visited[node] = true;
        dfs_visited[node] = true;

        for(let item of this.adjacencyList[node]) {
            if(!visited[item]) {
                const isCycle = this.callDCycleDetection(item, visited, dfs_visited);
                if(isCycle) {
                    return true;
                }
            }
            else if(dfs_visited[item]) {
                return true;
            }
        }
        dfs_visited[node] = false;
        return false;
    }

    callDFSDirectedCycleDetection() {
        let visited = {};
        let dfs_visited = {};

        for(let item in this.adjacencyList) {
            if(!visited[item]) {
                const isCyclePresent = this.callDCycleDetection(item, visited, dfs_visited);
                if(isCyclePresent) {
                    return true;
                }
            }
        }
        return false;
    };

    callTopologicalSort(node, visited, stack_arr) {
        visited[node] = true;

        for(let neighbour of this.adjacencyList[node]) {
            if(!visited[neighbour]) {
                this.callTopologicalSort(neighbour, visited, stack_arr);
                
            };
        }
        stack_arr.push(node);
    }

    callDFSTpologicalSort() {
        let visited = {};
        let stack_arr = [];

        for(let item in this.adjacencyList) {
            if(!visited[item]) {
                this.callTopologicalSort(item, visited, stack_arr);
            }
        }
        let ans = [];
        while(stack_arr.length) {
            const ele = stack_arr.pop();
            ans.push(ele);
        }
        return ans;
    }

    callTopologicalSortBFS() {
        // Kahn's Algorithm
        let inDegree = {};
        let queue = [];
        // find indegree of all nodes
        for(let node in this.adjacencyList) {
            inDegree[node] = 0;
        }
        for(let node in this.adjacencyList) {
            for(let neighbour of this.adjacencyList[node]){
                inDegree[neighbour] = (inDegree[neighbour] || 0) + 1;
            } 
        }
        //  add to queue the indegree equals to 0
        for(let i of Object.keys(inDegree)) {
            if(inDegree[i] == 0){
                queue.push(i);
            }
        }
        let ans = [];

        // traverse through queue to 
        while(queue.length) {
            let front = queue.shift();
            ans.push(front);
            for(let neighbour of this.adjacencyList[front]) {
                inDegree[neighbour]--;
                if(inDegree[neighbour] == 0) {
                    queue.push(neighbour);
                }
            }
        }
        return ans;
    }

    findShortestPathBFS(src, dest) {
        let visited = {};
        let parent = {};
        let queue = [];
        queue.push(src);

        visited[src] = true;
        parent[src] = -1;

        while(queue.length) {
            let front = queue.shift();
            for(let neighbour of this.adjacencyList[front]) {
                if(!visited[neighbour]) {
                    visited[neighbour] = true;
                    parent[neighbour] = front;
                    queue.push(neighbour);
                }
            }
        }

        console.log(parent);

        let keys = Object.keys(parent);
        let path = 0;
        let local = dest
        while(local !== src) {
            path++;
            local = parent[local];
        }
        return path;
    }


    addDWEdge(src, dest, weight) {
        if(this.adjacencyList[src]) {
            this.adjacencyList[src].push([dest, weight]);
        }
    }

    printAdjListWithWeight() {
        for(let node in this.adjacencyList) {
            console.log(`${node} => ${this.adjacencyList[node]}`);
        }
    }

    callDFSDirectedWeightedGraphPath(node, visited, stackArr) {
        visited[node] = true;

        for(let neighbour of this.adjacencyList[node]) {
            if(!visited[neighbour[0]]) {
                this.callDFSDirectedWeightedGraphPath(neighbour[0], visited, stackArr);
                
            }
        }
        stackArr.push(node);
     }

    callShortestPathUsingDFSDW(src, dest) {
        let visited = {};
        let stackArr = [];
        let distance = {};


        for(let node in this.adjacencyList) {
            if(!visited[node]) {
                this.callDFSDirectedWeightedGraphPath(node, visited, stackArr);
               
            }
        }

        for(let item in this.adjacencyList) {

             distance[item]= Infinity;
        }
        distance[src] = 0;

        while(stackArr.length) {
            const top = stackArr.pop();
            if(distance[top]!= Infinity) {
                for(let neighbour of this.adjacencyList[top]) {
                    if(distance[top] + neighbour[1] < distance[neighbour[0]]) {
                        distance[neighbour[0]] = distance[top] + neighbour[1];
                    }
                }
            }
        }

        console.log(distance);

    }

};



const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
// graph.addVertex('G');
// graph.addVertex('H');
// graph.addVertex('I');



// graph.addEdge('A', 'B');
// graph.addEdge('B', 'C');
// graph.addEdge('D', 'E');

// graph.addEdge('E', 'F');

// graph.addEdge('F', 'G');

// graph.addEdge('G', 'H');

// graph.addEdge('H', 'E');

// graph.addEdge('I', 'G');

// const ans = graph.findBFS();
// console.log(ans);

// const dfsResult = graph.findDFS();
// console.log('Simple traversal of Graph in depth',dfsResult);

// const bfsResult = graph.detectCycleBFS();
// console.log('BFS',bfsResult);


// cycle detection in directed graph using DFS

// graph.addDEdge('A', 'B');
// graph.addDEdge('B', 'C');
// graph.addDEdge('B', 'F');
// graph.addDEdge('C', 'D');
// graph.addDEdge('C', 'E');
// graph.addDEdge('E', 'D');
// graph.addDEdge('F', 'G');
// graph.addDEdge('F', 'H');
// graph.addDEdge('G', 'H');
// graph.addDEdge('H', 'F');

// graph.display();

// const result = graph.callDFSDirectedCycleDetection();
// console.log('Cycle detection in directed graph using DFS', result);

// Tpological Sort using DFS = DAG(Directed Acyclic Graph)
// graph.addDEdge('A', 'B');
// graph.addDEdge('A', 'C');
// graph.addDEdge('B', 'D');
// graph.addDEdge('C', 'D');
// graph.addDEdge('D', 'E');
// graph.addDEdge('D', 'F');
// graph.addDEdge('F', 'E');
// graph.display();


// const result = graph.callDFSTpologicalSort();
// console.log('is Graph is Topological sort', result);

// Topological Sort (Kahn's Algorith) cycle detection using BFS

// graph.addDEdge('A', 'B')
// // graph.addDEdge('A', 'C');
// graph.addDEdge('B', 'D');
// graph.addDEdge('D', 'C');
// graph.addDEdge('D', 'E');
//graph.addDEdge('C', 'A');


// graph.display();

// const result = graph.callTopologicalSortBFS();
// console.log('Topological Sort() using BFS', result);
// if(result.length === graph.adjacencyList.length) {
//     console.log('Graph is acyclic');
// }else {
//     console.log('Graph is cyclic');
// }


// shortest path using BFS in Undirected from Node A to H

// graph.addEdge('A', 'B');
// graph.addEdge('A', 'E');
// graph.addEdge('A', 'F');

// graph.addEdge('B', 'C');
// graph.addEdge('C', 'D');

// graph.addEdge('D', 'E');
// graph.addEdge('D', 'H');

// graph.addEdge('F', 'G');

// graph.addEdge('H', 'G');

// graph.display();
// const result = graph.findShortestPathBFS('A', 'D');
// console.log(result);


// shortest pathe using DFS - directed Graph

graph.addDWEdge('A', 'F', 6);
graph.addDWEdge('A', 'C', 2);

graph.addDWEdge('B', 'A', 5);
graph.addDWEdge('B', 'C', 3);

graph.addDWEdge('C', 'F', 7);
graph.addDWEdge('C', 'E', 4);
graph.addDWEdge('C', 'D', 2);

graph.addDWEdge('E', 'D', -2);
graph.addDWEdge('F', 'E', -1);

// display adjency list
graph.printAdjListWithWeight();

// call DisplayGraph

graph.callShortestPathUsingDFSDW('A', 'F');



















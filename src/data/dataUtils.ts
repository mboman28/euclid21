import { Data, Node } from "../types/types"

// Data Manipulation functions
export const getRoot = (data: Data, node: string, centerX: number, centerY: number): [{ [key: string]: Node }, Set<string>] => { 
    let nodes: { [key: string]: Node } = {};
    let edges: Set<string> = new Set<string>();
    const nodeData = getNode(data, node);
    
    let x = centerX - 300;
    if (x < 0) { x = 0; }
    let y = centerY - 100;
    if (y < 0) { y = 0; }
    for (const rootNode of nodeData.root) {
        nodes[rootNode] = { x: x, y: y }
        edges.add(rootNode + ',' + node)
        x += 75;
    }

    nodes[node] = { x: centerX, y: centerY };

    return [nodes, edges]
}

export const getBranch = (data: Data, node: string, centerX: number, centerY: number): [{ [key: string]: Node }, Set<string>] => { 
    let nodes: { [key: string]: Node } = {};
    let edges: Set<string> = new Set<string>();
    const nodeData = getNode(data, node);

    let x = centerX - 300;
    if (x < 0) { x = 0; }
    let y = centerY + 100;
    for (const branchNode of nodeData.branch) {
        nodes[branchNode] = { x: x, y: y }
        edges.add(node + ',' + branchNode)
        x += 75;
    }

    nodes[node] = { x: centerX, y: centerY };

    return [nodes, edges]
}

export const getDeps = (data: Data, node: string, centerX: number, centerY: number): [{ [key: string]: Node }, Set<string>] => {
    const [rootNodes, rootEdges] = getRoot(data, node, centerX, centerY);
    const [branchNodes, branchEdges] = getBranch(data, node, centerX, centerY);
    const edgesList: string[] = Array.from(rootEdges).concat(Array.from(branchEdges))
    return [{...rootNodes, ...branchNodes}, new Set<string>(edgesList)];
}

export const removeNode = (data: Data, node: string, nodes: { [key: string]: Node }, edges: Set<string>): [{ [key: string]: Node }, Set<string>] => {
    let edgesToRemove: string[] = []
    edges.forEach((edge) => {
        const [from, to] = edge.split(',');
        if (from === node || to === node) {
            edgesToRemove.push(edge);
        }
    })
    for (const edge of edgesToRemove) {
        edges.delete(edge);
    }
    for (const node in nodes) {
        let keep = false;
        edges.forEach((edge) => {
            const [from, to] = edge.split(',');
            if (from === node || to === node) {
                keep = true
            }
        })
        if (!keep) {
            delete nodes[node]
        }
    }

    return [nodes, edges]
}

// Node properties
export const getNode = (data: Data, name: string) => {
    const kind = name[0];
    const [book, prop] = name.slice(1).split('.')
    
    return data[book][kind][prop]
}

export const getColor = (kind: string) => {
    if (kind === 'A') { return 'lightblue'; }
    if (kind === 'N') { return 'pink'; }
    if (kind === 'D') { return 'lightgreen'; }
    return 'yellow';
}

export const getKind = (kind: string) => {
    if (kind === 'A') { return 'Axiom'; }
    if (kind === 'N') { return 'Common Notion'; }
    if (kind === 'D') { return 'Definition'; }
    if (kind === 'P') { return 'Propositon'; }
    return '';
}

export const getTitle = (node: string) => {
    const kind = getKind(node[0]);
    const [book, prop] = node.slice(1).split('.')

    if (kind === 'Axiom' || kind === 'Common Notion') {
        return kind + ' ' + prop
    }
    return 'Book ' + book + ' ' + kind + ' ' + prop
}
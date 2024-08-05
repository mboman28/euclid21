import { Data, Node } from "../types/types"

export const getNode = (data: Data, name: string) => {
    const kind = name[0];
    const [book, prop] = name.slice(1).split('.')

    return data[book][kind][prop]
}

export const getKind = (kind: string) => {
    if (kind === 'A') { return 'Axiom'; }
    if (kind === 'N') { return 'Common Notion'; }
    if (kind === 'D') { return 'Definition'; }
    if (kind === 'P') { return 'Propositon'; }
    return '';
}

export const getDeps = (data: Data, node: string, centerX: number, centerY: number): [{ [key: string]: Node }, Set<string>] => {
    let nodes: { [key: string]: Node } = {};
    let edges: Set<string> = new Set<string>();
    nodes[node] = { x: centerX, y: centerY };

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
    
    x = centerX - 300;
    if (x < 0) { x = 0; }
    y = centerY + 100;
    // if (y < 0) { y = 0; }
    for (const branchNode of nodeData.branch) {
        nodes[branchNode] = { x: x, y: y }
        edges.add(node + ',' + branchNode)
        x += 75;
    }

    return [nodes, edges]

}
export type DataContextType = any;
export type DataNode = {root: string[], branch: string[]}
export type Data = {[key: string]: {[key: string]: {[key: string]: DataNode}}};

export type Node = {x: number, y: number};

export type NodeOperations = {
    displayNode: (n: string) => void;
    displayNodeRoot: (n: string) => void;
    displayNodeBranch: (n: string) => void;
    removeNode: (n: string) => void;
}
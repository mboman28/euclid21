export type DataContextType = any;
export type DataNode = {root: string[], branch: string[]}
export type Data = {[key: string]: {[key: string]: {[key: string]: DataNode}}};

export type Node = {x: number, y: number};
export type Edge = {from: Node, to: Node};
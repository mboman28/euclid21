import { Data } from "../types/types"

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
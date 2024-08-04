import { Data } from "../types/types"

export const getNode = (data: Data, name: string) => {
    const kind = name[0];
    const [book, prop] = name.slice(1).split('.')

    return data[book][kind][prop]
}
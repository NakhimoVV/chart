import { IData } from '../types/interfaces'

export function findMaxValue(data: IData): number {
    return Object.values(data).reduce((acc, item) => {
        if (typeof item === 'object') {
            const { front, back, db } = item
            acc = Math.max(acc, front, back, db)
        }
        return acc
    }, 0)
}

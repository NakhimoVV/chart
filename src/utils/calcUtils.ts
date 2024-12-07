import { IData } from '../types/interfaces'

export const calcDiff = (a: number, b: number): number => {
    return a > b ? -(a - b) : -(a - b)
}

export function calcMaxY(data: IData): number {
    return Object.values(data).reduce((acc, item) => {
        if (typeof item === 'object') {
            const { front, back, db } = item
            acc = Math.max(acc, front + back + db)
        }
        return acc
    }, 0)
}

export function sumValueSelf(data: IData): number[] {
    const res: number[] = []
    Object.values(data).forEach((item) => {
        if (typeof item === 'object') {
            const { front, back, db } = item
            res.push(front + back + db)
        }
    })
    return res
}

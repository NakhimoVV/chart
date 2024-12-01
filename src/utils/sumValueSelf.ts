import { IData } from '../types/interfaces'

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

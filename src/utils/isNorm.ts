import { IComponent } from '../types/interfaces'

export function isNorm(data: IComponent | number): data is number {
    return typeof data === 'number'
}

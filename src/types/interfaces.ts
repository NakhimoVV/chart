export interface IComponent {
    front: number
    back: number
    db: number
}

export interface IData {
    title: string
    dev: IComponent
    test: IComponent
    prod: IComponent
    norm: number
}

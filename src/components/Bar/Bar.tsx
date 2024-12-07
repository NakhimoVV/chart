import { forwardRef } from 'react'
import { IComponent } from '../../types/interfaces'
import { isNorm } from '../../utils/isNorm'
import style from './Bar.module.scss'

interface BarProps {
    data: IComponent | number
    index: number
    id: string
}

const Bar = forwardRef<HTMLLIElement, BarProps>(({ data, index, id }, ref) => {
    if (isNorm(data)) {
        return (
            <li className={style.bar} style={{ height: data / index + 'svh' }}>
                <p>{data}</p>
            </li>
        )
    }
    const { front, back, db } = data
    const sum = front + back + db
    return (
        <li
            ref={ref}
            className={style.bar}
            style={{ height: sum / index + 'svh' }}
            id={id}
        >
            <div
                className={style.item + ' db-color'}
                style={{ height: db / index + 'svh' }}
            >
                <p>{db}</p>
            </div>
            <div
                className={style.item + ' back-color'}
                style={{ height: back / index + 'svh' }}
            >
                <p>{back}</p>
            </div>
            <div
                className={style.item + ' front-color'}
                style={{ height: front / index + 'svh' }}
            >
                <p>{front}</p>
            </div>
        </li>
    )
})

export default Bar

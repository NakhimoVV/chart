import { FC } from 'react'
import { IData } from '../../types/interfaces'
import { calcMaxY } from '../../utils/calcMaxY'
import style from './ChartBox.module.scss'
import { sumValueSelf } from '../../utils/sumValueSelf'

interface ChartBoxProps {
    data: IData
}

const ChartBox: FC<ChartBoxProps> = ({ data }) => {
    const maxAxisX = 70
    const maxValue = calcMaxY(data)
    const index = +(maxValue / maxAxisX).toFixed(3)
    const arr = sumValueSelf(data)
    // const arrVh = arr.map((i) => Math.floor(i / index))
    console.log(arr)

    return (
        <div className={style.chartBlock}>
            <ul className={style.list}>
                {arr.map((value, i) => (
                    <li
                        key={i}
                        className={style.norm}
                        style={{ height: value / index + 'svh' }}
                    >
                        <div
                            className={style.item}
                            style={{ height: 31 / index + 'svh' }}
                        >
                            <p>31</p>
                        </div>
                        <div
                            className={style.item}
                            style={{ height: 100 / index + 'svh' }}
                        >
                            <p>100</p>
                        </div>
                        <div
                            className={style.item}
                            style={{ height: 66 / index + 'svh' }}
                        >
                            <p>66</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={style.norm} style={{ height: 150 / index + 'svh' }}>
                <p>{data.norm}</p>
            </div>
        </div>
    )
}

export default ChartBox

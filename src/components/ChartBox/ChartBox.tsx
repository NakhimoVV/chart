import { FC } from 'react'
import { IData } from '../../types/interfaces'
import { calcMaxY } from '../../utils/calcMaxY'
import Bar from '../Bar/Bar'
import style from './ChartBox.module.scss'

interface ChartBoxProps {
    data: IData
}

const ChartBox: FC<ChartBoxProps> = ({ data }) => {
    // maxAxisX <= 70
    const maxAxisX = 30
    const maxValue = calcMaxY(data)
    const index = +(maxValue / maxAxisX).toFixed(3)

    return (
        <div className={style.chartBlock}>
            <ul className={style.list}>
                {Object.entries(data).map(([key, value], i) => {
                    if (key === 'title') return null
                    return <Bar key={i} data={value} index={index} />
                })}
            </ul>
        </div>
    )
}

export default ChartBox

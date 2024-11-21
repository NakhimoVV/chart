import React from 'react'
import { IData } from '../../types/interfaces'
import style from './Chart.module.scss'

interface ChartProps {
    data: IData
}

const Chart: React.FC<ChartProps> = ({ data }) => {
    return (
        <div className={style.chartBlock}>
            <div>svg</div>
        </div>
    )
}

export default Chart

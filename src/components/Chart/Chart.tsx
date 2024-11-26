import React from 'react'
import { IData } from '../../types/interfaces'
import style from './Chart.module.scss'
import BarItem from '../svg/BarItem'
import { calcMaxY } from '../../utils/calcMaxY'

interface ChartProps {
    data: IData
}

const Chart: React.FC<ChartProps> = ({ data }) => {
    const barWidth = 80
    const spacing = 60
    const maxValue = calcMaxY(data) + 95

    return (
        <div className={style.chartBlock}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height={maxValue + 25}
                // viewBox="0 0 100% 100%"
                preserveAspectRatio="xMinYMin meet"
            >
                {/* Сам График */}
                <g transform={`translate(0, ${maxValue}) scale(1, -1)`}>
                    {/* <line x1="0" y1="0" x2="500" y2="0" stroke="none" /> */}
                    {/* <line x1="0" y1="0" x2="0" y2={maxValue} stroke="none" /> */}
                    <line x1="0" y1="0" x2="500" y2="0" stroke="red" />
                    <line x1="0" y1="0" x2="0" y2={maxValue} stroke="red" />
                    {/* перечисление Bar'ов */}
                    {Object.entries(data).map(([key, value], index) => {
                        if (key === 'title') return null
                        const translateX = (index - 1) * (barWidth + spacing)
                        if (key === 'norm') {
                            return (
                                <g
                                    key={key}
                                    transform={`translate(${translateX},0) `}
                                >
                                    <defs>
                                        <pattern
                                            id="diagonalStripes"
                                            patternUnits="userSpaceOnUse"
                                            width="20"
                                            height="20"
                                            patternTransform="rotate(-45)"
                                        >
                                            <rect
                                                width="14"
                                                height="20"
                                                fill="var(--color-col-blue)"
                                            />
                                        </pattern>
                                    </defs>
                                    <rect
                                        x={0}
                                        y={0}
                                        rx={10}
                                        ry={10}
                                        width={barWidth}
                                        height={value}
                                        fill="url(#diagonalStripes)"
                                    />
                                    <g>
                                        <rect
                                            x={(barWidth - 48) / 2}
                                            y={value / 2 - 12}
                                            rx={5}
                                            ry={5}
                                            width={48}
                                            height={24}
                                            fill="white"
                                        />
                                        <text
                                            x={barWidth / 2}
                                            y={-value / 2}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontSize="14"
                                            fontWeight="700"
                                            fill="var(--color-gray)"
                                            transform="scale(1, -1)"
                                        >
                                            150
                                        </text>
                                    </g>

                                    <text
                                        x={barWidth / 2}
                                        y={20}
                                        textAnchor="middle"
                                        fontSize="14"
                                        fill="var(--color-gray)"
                                        transform="scale(1, -1)"
                                    >
                                        норматив
                                    </text>
                                </g>
                            )
                        }
                        return (
                            <g
                                key={key}
                                transform={`translate(${translateX},0)`}
                            >
                                {/* перечисление BarItem'ов */}
                                {Object.entries(value).map(([k, kData]) => {
                                    return (
                                        <BarItem
                                            key={k}
                                            nameComponent={
                                                k as 'front' | 'back' | 'db'
                                            }
                                            data={value}
                                        />
                                    )
                                })}
                                <text
                                    x={barWidth / 2}
                                    y={20}
                                    fill="var(--color-gray)"
                                    textAnchor="middle"
                                    fontSize="12"
                                    transform="scale(1, -1)"
                                >
                                    {key}
                                </text>
                            </g>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}

export default Chart

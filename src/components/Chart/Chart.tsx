import React from 'react'
import { IData } from '../../types/interfaces'
import style from './Chart.module.scss'
import BarItem from '../svg/BarItem'

interface ChartProps {
    data: IData
}

const Chart: React.FC<ChartProps> = ({ data }) => {
    const barWidth = 80
    const maxValue = 500

    return (
        <div className={style.chartBlock}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height={maxValue + 30}
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
                    {Object.entries(data).map(([key, value]) => {
                        if (key === 'dev') {
                            return (
                                <g key={key}>
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
                                        fill="black"
                                        textAnchor="middle"
                                        fontSize="12"
                                        transform="scale(1, -1)"
                                    >
                                        {key}
                                    </text>
                                </g>
                            )
                        }
                        return null
                        // if (key === 'test') {}
                        // if (key === 'prod') {}
                    })}
                </g>
            </svg>
        </div>
    )
    // const sections = ['dev', 'test', 'prod'] // Названия этапов

    // // Максимальное значение для нормализации высоты
    // const maxNorm = Math.max(
    //     ...sections.map((key) => {
    //         const section = data[key as Instance]
    //         return section.front + section.back + section.db
    //     }),
    //     data.norm
    // )

    // return (
    //     <div className={style.chartBlock}>
    //         <svg width="600" height="500">
    //             {sections.map((key, index) => {
    //                 const stage = data[key as Instance]
    //                 const totalHeight = 300 // высота столбцов
    //                 const x = 80 + index * 120 // Отступ для столбцов

    //                 // Высчитываем высоты для частей столбца
    //                 const frontHeight = (stage.front / maxNorm) * totalHeight
    //                 const backHeight = (stage.back / maxNorm) * totalHeight
    //                 const dbHeight = (stage.db / maxNorm) * totalHeight

    //                 return (
    //                     <g key={key}>
    //                         {/* DB часть */}
    //                         <rect
    //                             x={x}
    //                             y={400 - dbHeight}
    //                             rx="10"
    //                             ry="0"
    //                             width="80"
    //                             height={dbHeight}
    //                             fill={'var(--color-col-pink)'}
    //                         />
    //                         {/* Back часть */}
    //                         <rect
    //                             x={x}
    //                             y={400 - dbHeight - backHeight}
    //                             width="80"
    //                             height={backHeight}
    //                             fill="var(--color-col-purple)"
    //                         />
    //                         {/* Front часть */}
    //                         <rect
    //                             x={x}
    //                             y={400 - dbHeight - backHeight - frontHeight}
    //                             width="80"
    //                             height={frontHeight}
    //                             fill="var(--color-col-blue)"
    //                         />

    //                         {/* Подпись */}
    //                         <text
    //                             x={x + 40}
    //                             y={425}
    //                             textAnchor="middle"
    //                             fontSize="14"
    //                             fill="var(--color-gray)"
    //                         >
    //                             {key}
    //                         </text>
    //                     </g>
    //                 )
    //             })}

    //             {/* Норматив */}
    //             <g>
    //                 <rect
    //                     x={440}
    //                     y={400 - (data.norm / maxNorm) * 300}
    //                     width="60"
    //                     height={(data.norm / maxNorm) * 300}
    //                     fill="url(#stripes)"
    //                 />
    //                 <text
    //                     x={470}
    //                     y={410}
    //                     textAnchor="middle"
    //                     fontSize="14"
    //                     fill="var(--color-gray)"
    //                 >
    //                     норматив
    //                 </text>
    //             </g>

    //             {/* Определяем полосатый паттерн */}
    //             <defs>
    //                 <pattern
    //                     id="stripes"
    //                     patternUnits="userSpaceOnUse"
    //                     width="10"
    //                     height="10"
    //                 >
    //                     <path
    //                         d="M0,0 l10,10 M-2.5,2.5 l5,-5 M2.5,7.5 l5,-5"
    //                         stroke="var(--color-col-blue)"
    //                         strokeWidth="2"
    //                     />
    //                 </pattern>
    //             </defs>
    //         </svg>
    //     </div>
    // )
}

export default Chart

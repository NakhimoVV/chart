import { FC, useEffect, useRef } from 'react'
import { IData } from '../../types/interfaces'
import Bar from '../Bar'
import DiffBadge from '../DiffBadge'
import { createArrow } from '../../utils/createArrow'
import { calcDiff, calcMaxY, sumValueSelf } from '../../utils/calcUtils'
import style from './ChartBox.module.scss'

interface ChartBoxProps {
    data: IData
}

const ChartBox: FC<ChartBoxProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement>(null)
    const dif1 = useRef<HTMLDivElement>(null)
    const dif2 = useRef<HTMLDivElement>(null)
    const bar1 = useRef<HTMLLIElement>(null)
    const bar2 = useRef<HTMLLIElement>(null)
    const bar3 = useRef<HTMLLIElement>(null)

    const maxAxisX = 30 // maxAxisX <= 70
    const maxValue = calcMaxY(data)
    const index = +(maxValue / maxAxisX).toFixed(3)
    const sum = sumValueSelf(data)

    useEffect(() => {
        const updateArrow = () => {
            if (!svgRef.current) return
            const svg = svgRef.current

            while (svg.firstChild) {
                svg.removeChild(svg.firstChild)
            }

            if (bar1.current && dif1.current) {
                createArrow(bar1.current, dif1.current, svg)
            }
            if (bar2.current && dif2.current) {
                createArrow(bar2.current, dif2.current, svg)
            }

            if (dif1.current && bar2.current) {
                createArrow(dif1.current, bar2.current, svg)
            }
            if (dif2.current && bar3.current) {
                createArrow(dif2.current, bar3.current, svg)
            }
        }

        window.addEventListener('resize', updateArrow)
        updateArrow()

        return () => {
            window.removeEventListener('resize', updateArrow)
        }
    }, [])

    const switchRefBar = (index: number) => {
        switch (index) {
            case 1:
                return bar1
            case 2:
                return bar2
            case 3:
                return bar3
            default:
                return null
        }
    }

    return (
        <div className={style.chartBlock}>
            <div className={style.diffPanel}>
                <DiffBadge
                    ref={dif1}
                    value={calcDiff(sum[0], sum[1])}
                    id="dif1"
                />
                <DiffBadge
                    ref={dif2}
                    value={calcDiff(sum[1], sum[2])}
                    id="dif2"
                />
            </div>
            <ul className={style.list}>
                {Object.entries(data).map(([key, value], i) => {
                    if (key === 'title') return null
                    return (
                        <Bar
                            ref={switchRefBar(i)}
                            key={i}
                            data={value}
                            index={index}
                            id={`bar${i}`}
                            name={key}
                        />
                    )
                })}
            </ul>
            <svg
                ref={svgRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
                className={style.svg}
            ></svg>
        </div>
    )
}

export default ChartBox

import { FC, useEffect, useRef } from 'react'
import { IData } from '../../types/interfaces'
import { calcMaxY } from '../../utils/calcMaxY'
import Bar from '../Bar/Bar'
import style from './ChartBox.module.scss'
import { createArrow } from '../../utils/createArrow'
import DiffBadge from '../DiffBadge/DiffBadge'

interface ChartBoxProps {
    data: IData
}

const ChartBox: FC<ChartBoxProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement>(null)
    const element1Ref = useRef<HTMLDivElement>(null)
    const element2Ref = useRef<HTMLLIElement>(null)

    const maxAxisX = 30 // maxAxisX <= 70
    const maxValue = calcMaxY(data)
    const index = +(maxValue / maxAxisX).toFixed(3)

    useEffect(() => {
        const updateArrow = () => {
            if (element1Ref.current && element2Ref.current && svgRef.current) {
                createArrow(
                    element1Ref.current,
                    element2Ref.current,
                    svgRef.current
                )
            }
        }

        window.addEventListener('resize', updateArrow)
        updateArrow()

        return () => {
            window.removeEventListener('resize', updateArrow)
        }
    }, [])

    return (
        <div className={style.chartBlock}>
            <div className={style.diffPanel}>
                <DiffBadge ref={element1Ref} value={-26} />
                <DiffBadge value={+9} />
            </div>
            <ul className={style.list}>
                {Object.entries(data).map(([key, value], i) => {
                    if (key === 'title') return null
                    return (
                        <Bar
                            ref={i === 2 ? element2Ref : null}
                            key={i}
                            data={value}
                            index={index}
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
            ></svg>
        </div>
    )
}

export default ChartBox

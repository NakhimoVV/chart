import { FC } from 'react'
import { IComponent } from '../../types/interfaces'

interface BarItemProps {
    nameComponent: 'front' | 'back' | 'db'
    data: IComponent
}

const BarItem: FC<BarItemProps> = ({ nameComponent, data }) => {
    const { front, back, db } = data
    const barWidth = 80
    const paths = {
        front: {
            barPath: `
                M0,${db + back}
                v${front - 10}
                a10,10 0 0,0 10,10
                h${barWidth - 20}
                a10,10 0 0,0 10,-10
                v-${front - 10}
                Z
            `,
            color: 'var(--color-col-blue)',
            textY: -(db + back + (front - 10) / 2),
            text: front,
        },
        back: {
            barPath: `
                M0,${db}
                v${back}
                h${barWidth}
                v-${back}
                Z
            `,
            color: 'var(--color-col-purple)',
            textY: -(db - 10 + back / 2),
            text: back,
        },
        db: {
            barPath: `
                M10,0
                a10,10 0 0,0 -10,10 
                v${db - 10}
                h${barWidth}
                v-${db - 10}
                a10,10 0 0,0 -10,-10
                Z
            `,
            color: 'var(--color-col-pink)',
            textY: -(db - 10) / 2,
            text: db,
        },
    }

    const { barPath, color, textY, text } = paths[nameComponent]

    return (
        <g>
            <path d={barPath} fill={color} />
            <text
                x={barWidth / 2}
                y={textY}
                fill="white"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                transform="scale(1, -1)"
            >
                {text}
            </text>
        </g>
    )
}

export default BarItem

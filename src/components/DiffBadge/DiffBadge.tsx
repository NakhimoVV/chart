import { forwardRef } from 'react'
import style from './DiffBadge.module.scss'

interface DiffBadgeProps {
    value: number
    id: string
}

// Используем forwardRef
// forwardRef<ТипРефа, ТипПропсов>
const DiffBadge = forwardRef<HTMLDivElement, DiffBadgeProps>(
    ({ value, id }, ref) => {
        const arrowStyle =
            value > 0 ? style.arrowUp : value < 0 ? style.arrowDown : ''
        return (
            <div className={`${style.badge} ${arrowStyle}`} ref={ref} id={id}>
                <span>{value > 0 ? `+${value}` : value}</span>
            </div>
        )
    }
)

export default DiffBadge

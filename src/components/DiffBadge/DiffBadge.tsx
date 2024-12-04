import { forwardRef } from 'react'
import style from './DiffBadge.module.scss'

interface DiffBadgeProps {
    value: number
}

// Используем forwardRef
// forwardRef<ТипРефа, ТипПропсов>
const DiffBadge = forwardRef<HTMLDivElement, DiffBadgeProps>(
    ({ value }, ref) => {
        const arrowStyle =
            value > 0 ? style.arrowUp : value < 0 ? style.arrowDown : ''
        return (
            <div className={`${style.badge} ${arrowStyle}`} ref={ref}>
                <span>{value > 0 ? `+${value}` : value}</span>
            </div>
        )
    }
)

export default DiffBadge

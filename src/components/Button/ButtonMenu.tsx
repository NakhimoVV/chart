import { useEffect, useRef, useState } from 'react'
import style from './Button.module.scss'

interface ButtonMenuProp {
    iconType: string
}

const ButtonMenu = ({ iconType }: ButtonMenuProp) => {
    const [isOpen, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleOpenMenu = () => {
        setOpen(!isOpen)
    }
    const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className={style.wrapp} ref={menuRef}>
            <button
                type="button"
                className={style.btn + iconType}
                title="Открыть меню выбора тестов"
                onClick={handleOpenMenu}
            >
                <span className="visually-hidden">
                    Открыть меню выбора тестов
                </span>
            </button>
            {isOpen && (
                <ul className={style.menuList}>
                    <li className={style.checked}>OS Doors</li>
                    <li>OS Bombuntu</li>
                    <li>Mibre Office</li>
                    <li>LoWtEx</li>
                    <li>W$ POS</li>
                </ul>
            )}
        </div>
    )
}

export default ButtonMenu

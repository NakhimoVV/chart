import { useEffect, useRef, useState } from 'react'
import style from './Button.module.scss'
import { useFetchData } from '../../hooks/useFetchData'
import { menuItems } from './menuItems'

interface ButtonMenuProp {
    iconType: string
}

const ButtonMenu = ({ iconType }: ButtonMenuProp) => {
    const [isOpen, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const { fetchData, activeItemMenu, setActiveItemMenu } = useFetchData()

    const handleOpenMenu = () => {
        setOpen(!isOpen)
    }
    const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setOpen(false)
        }
    }

    const handleMenuItemClick = (index: number, url: string) => {
        setActiveItemMenu(index)
        fetchData(url)
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
                    {menuItems.map((item, index) => (
                        <li
                            key={item.label}
                            className={
                                index === activeItemMenu
                                    ? `${style.active}`
                                    : ''
                            }
                        >
                            <button
                                className={style.menuList__button}
                                onClick={() =>
                                    handleMenuItemClick(index, item.url)
                                }
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ButtonMenu

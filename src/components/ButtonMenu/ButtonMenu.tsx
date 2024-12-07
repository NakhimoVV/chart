import { useEffect, useRef, useState } from 'react'
import style from './Button.module.scss'
import useFetchData from '../../hooks/useFetchData'

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

    const { fetchData } = useFetchData()

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
                    <li className={style.checked}>
                        <button
                            className={style.menuList__button}
                            onClick={() =>
                                fetchData('https://rcslabs.ru/ttrp1.json')
                            }
                        >
                            OS Doors
                        </button>
                    </li>
                    <li>
                        <button
                            className={style.menuList__button}
                            onClick={() =>
                                fetchData('https://rcslabs.ru/ttrp2.json')
                            }
                        >
                            OS Bombuntu
                        </button>
                    </li>
                    <li>
                        <button
                            className={style.menuList__button}
                            onClick={() =>
                                fetchData('https://rcslabs.ru/ttrp3.json')
                            }
                        >
                            Mibre Office
                        </button>
                    </li>
                    <li>
                        <button
                            className={style.menuList__button}
                            onClick={() =>
                                fetchData('https://rcslabs.ru/ttrp4.json')
                            }
                        >
                            LoWtEx
                        </button>
                    </li>
                    <li>
                        <button
                            className={style.menuList__button}
                            onClick={() =>
                                fetchData('https://rcslabs.ru/ttrp5.json')
                            }
                        >
                            W$ POS
                        </button>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default ButtonMenu

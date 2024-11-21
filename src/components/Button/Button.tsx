import style from './Button.module.scss'

interface ButtonProp {
    iconType: string
}

const Button = ({ iconType }: ButtonProp) => {
    return <button type="button" className={style.btn + iconType}></button>
}

export default Button

import ButtonMenu from '../components/ButtonMenu/'
import ChartBox from '../components/ChartBox'
import data from '../mockData/1.json'
import style from './Main.module.scss'

const Main = () => {
    return (
        <main className={style.content + ' container'}>
            <div className={style.content__header}>
                <h1>Количество пройденных тестов “{data.title}”</h1>
                <ButtonMenu iconType=" icon-dots" />
            </div>
            <ChartBox data={data} />
            <div className={style.content__footer}>
                <p id="front">
                    <span className="icon-square"></span>Клиентская часть
                </p>
                <p id="back">
                    <span className="icon-square"></span>Серверная часть
                </p>
                <p id="db">
                    <span className="icon-square"></span>База данных
                </p>
            </div>
        </main>
    )
}

export default Main

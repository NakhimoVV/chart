import Chart from '../components/Chart/Chart'
import style from './Main.module.scss'
import ButtonMenu from '../components/Button/ButtonMenu'

import data from '../mockData/1.json'
import ChartBox from '../components/ChartBox/ChartBox'

const Main = () => {
    return (
        <main className={style.content + ' container'}>
            <div className={style.content__header}>
                <h1>Количество пройденных тестов “{data.title}”</h1>
                <ButtonMenu iconType=" icon-dots" />
            </div>
            {/* <Chart data={data} /> */}
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

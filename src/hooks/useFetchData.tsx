import { createContext, useContext, useState } from 'react'
import { IData } from '../types/interfaces'
import { dataTestsContext } from '../types/type'
import initialData from '../mockData/1.json'
import axios from 'axios'

const defaultState = {
    data: initialData,
    isLoading: false,
    error: null,
    fetchData: async () => Promise.resolve(),
    activeItemMenu: 0,
    setActiveItemMenu: () => {},
}

const DataTestsContext = createContext<dataTestsContext>(defaultState)

export const useFetchData = () => useContext(DataTestsContext)

interface DataProviderProps {
    children: JSX.Element | JSX.Element[]
}

const DataProvider = ({ children }: DataProviderProps) => {
    const [data, setData] = useState<IData>(initialData)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const [activeItemMenu, setActiveItemMenu] = useState(0)

    const fetchData = async (url: string) => {
        try {
            setLoading(true)
            const { data } = await axios.get(url)
            setData(data)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.message)
            } else {
                setError('Произошла неизвестная ошибка')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <DataTestsContext.Provider
            value={{
                data,
                isLoading,
                error,
                fetchData,
                activeItemMenu,
                setActiveItemMenu,
            }}
        >
            {!isLoading ? children : <p>Loading...</p>}
        </DataTestsContext.Provider>
    )
}
export default DataProvider

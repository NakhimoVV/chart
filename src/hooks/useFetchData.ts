import { useState } from 'react'
import { IData } from '../types/interfaces'
import axios from 'axios'

const useFetchData = () => {
    const [data, setData] = useState<IData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

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

    console.log(data)

    return { data, loading, fetchData, error }
}

export default useFetchData

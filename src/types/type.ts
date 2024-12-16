import { IData } from './interfaces'

export type dataTestsContext = {
    data: IData
    isLoading: boolean
    error: string | null
    fetchData: (url: string) => Promise<void>
    activeItemMenu: number
    setActiveItemMenu: (index: number) => void
}

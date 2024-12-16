import DataProvider from './hooks/useFetchData'
import Main from './layout/Main'

function App() {
    return (
        <DataProvider>
            <div className="App">
                <Main />
            </div>
        </DataProvider>
    )
}

export default App

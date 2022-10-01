import { useEffect, useState } from 'react'
import './App.css' 

interface Data {
    user: string
}

function App() {
    
    const [data, setData] = useState<Data[]>()

    useEffect(()=> {
        fetch('/api/')
        .then(response => response.json())
        .then(data => setData(data))
    }, [])
    
    return (
        <div className="App">
            {data ? data.map(data =>
            <p>{data.user}</p>) : <p>Loading</p>
            }
        </div>
        )
    }
    
    export default App
    
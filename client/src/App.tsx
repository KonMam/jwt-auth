import { Outlet } from 'react-router-dom'
import './App.css' 
import Nav from './components/Nav'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from './contexts/AppContext'

export default function App() {

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate();


    return (
        <AppContext.Provider value={{
                email, setEmail,
                username, setUsername,
                password, setPassword,
                loading, setLoading,
                navigate
        }}>
            <div className="App">
                <Nav/>
                <div id="detail">
                    <Outlet/>
                </div>
            </div>
        </AppContext.Provider>
    )
}
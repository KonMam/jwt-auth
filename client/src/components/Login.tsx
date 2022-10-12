import { FormEvent, useContext, useEffect, } from "react"
import AppContext from "../contexts/AppContext";

export default function Login() {

    const { 
        username, setUsername, 
        password, setPassword,
        navigate 
    } = useContext(AppContext)
 
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!password || !username) {
            alert('Complete all fields.')
            return;
        }

        if (password.length <= 8 || password.length >= 15) {
            alert('Incorrect details provided.')
            return;
        }

        if (username.length <= 4 || username.length >= 20) {
            alert('Incorrect details provided.')
            return;
        }

        fetch('/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({username, password})
        }).then(response => {
            if (response.status === 401) {
                alert('Incorrect details provided.')
            }
            if (response.status === 200) {
                if (username) {
                    localStorage.setItem('authenticated', username)
                }
                navigate?.('/board')
            }
        })
    }

    useEffect(() => {          
        if (localStorage.getItem('authenticated')) {
            navigate?.('/board')
            return;
        }
    }, [])

    return (
    <div className="auth-page">
        <form className="auth-form" onSubmit={e => handleSubmit(e)}>        
            <h1>Login</h1>
            <input
                placeholder="username" 
                type="text" 
                className="form-field"
                onChange={e => setUsername?.(e.target.value)}>
            </input>
            <input 
                placeholder="password" 
                type="password" 
                className="form-field"
                onChange={e => setPassword?.(e.target.value)}>
            </input>
            <button className="form-button auth-button">Submit</button>
        </form>
    </div>)
}
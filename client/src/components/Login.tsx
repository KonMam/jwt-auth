import { FormEvent, useContext, } from "react"
import AppContext from "../AppContext";

export default function Login() {

    const { 
        username, setUsername, 
        password, setPassword,
        navigate 
    } = useContext(AppContext)
        
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

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

    return (
    <div className="login">
        <h1>Login</h1>
        <form onSubmit={e => handleSubmit(e)}>
            <input
                placeholder="username" 
                type="text" 
                onChange={e => setUsername?.(e.target.value)}>
            </input>
            <input 
                placeholder="password" 
                type="password" 
                onChange={e => setPassword?.(e.target.value)}>
            </input>
            <button>Submit</button>
        </form>
    </div>)
}
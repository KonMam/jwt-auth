import { FormEvent, useContext, useEffect } from "react"
import AppContext from "../contexts/AppContext";

export default function Register() {
    
    const { 
        email, setEmail, 
        username, setUsername, 
        password, setPassword,
        navigate 
    } = useContext(AppContext)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!password || !email || !username) {
            alert('Complete all fields.')
            return;
        }

        if (password.length <= 8 || password.length >= 15) {
            alert('Password should be between 8 and 15 characters.')
            return;
        }

        if (username.length <= 4 || username.length >= 20) {
            alert('Username should be between 4 and 20 characters.')
            return;
        }

        fetch('/api/register',{
            method: 'POST',headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({email, username, password})
        }).then(response => {
            if (response.status === 409) {
                alert("User with these details already exists.")
            }
            
            if (response.status === 200) {
                navigate?.('/login')
            }
        });
    }

    useEffect(() => {          
        if (localStorage.getItem('authenticated')) {
            navigate?.('/board')
            return;
        }
    }, [])

    return (
    <div className="auth-page">   
        <form onSubmit={e => handleSubmit(e)} className="auth-form">
            <h1>Register</h1>     
            <input 
                placeholder="email" 
                type="email" 
                onChange={e => setEmail?.(e.target.value)}
                className="form-field">
            </input>
            <input 
                placeholder="username" 
                type="text" 
                onChange={e => setUsername?.(e.target.value)}
                className="form-field">
            </input>
            <input 
                placeholder="password" 
                type="password" 
                onChange={e => setPassword?.(e.target.value)}
                className="form-field">
            </input>
            <button className="form-button auth-button">Submit</button>
        </form>
    </div>)
}
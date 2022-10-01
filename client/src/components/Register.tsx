import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
    
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();
        
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

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
                navigate('/login')
            }
        });
    }

    return (
    <div className="register">
        <h1>Register</h1>        
        <form onSubmit={e => handleSubmit(e)}>
            <input placeholder="email" type="email" onChange={e => setEmail(e.target.value)}></input>
            <input placeholder="username" type="text" onChange={e => setUsername(e.target.value)}></input>
            <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)}></input>
            <button>Submit</button>
        </form>
    </div>)
}
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppContext from '../contexts/AppContext'

export default function Nav() {
    
    const { 
        navigate,
        setLoading 
    } = useContext(AppContext)
    
    const handleSignOut = () => {
        setLoading?.(true)
        localStorage.clear()
        navigate?.('/login')
    }

    const match = useLocation()
    if (match.pathname === "/board") {
        return (
        <nav>
            <Link 
                className="nav-element" 
                to={`/login`}
                onClick={handleSignOut}
            >
            Signout
            </Link>
        </nav>
        )
    }

    if (match.pathname === "/login") {
        return (
        <nav>
            <Link className="nav-element" to={`/`}>Home</Link>
            <Link className="nav-element" to={`/register`}>Register</Link>
        </nav>
        )
    }

    if (match.pathname === "/register") {
        return (
        <nav>
            <Link className="nav-element" to={`/`}>Home</Link>
            <Link className="nav-element" to={`/login`}>Login</Link>
        </nav>
        )
    }

    return (
        <nav>
            <Link className="nav-element" to={`/`}>Home</Link>
            <Link className="nav-element" to={`/login`}>Login</Link>
            <Link className="nav-element" to={`/register`}>Register</Link>
        </nav>
    )
}
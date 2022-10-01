import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <Link className="nav-element" to={`/`}>Home</Link>
            <Link className="nav-element" to={`/login`}>Login</Link>
            <Link className="nav-element" to={`/register`}>Register</Link>
        </nav>
    )
}
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";


export default function HiddenResource() {

    const { navigate } = useContext(AppContext)

    useEffect(() => {          
        if (localStorage.getItem('authenticated')) {
            navigate?.('/board')
            return;
        }
    }, [])

    return (
        <div className="home">
            <h1>Welcome to the Task Tracker!</h1>
            <p>During the creation of this project I have learnt and furthered my understanding in:</p>
            <ul>
                <li>How to implement JWT Authentication and Authorization.</li>
                <li>Using TypeORM for creating a relational mapping layer between database and server.</li>
                <li>Using React hooks, mainly useEffect, useContext, useRef.</li>
                <li>Usign react-router-dom for navigating between resources.</li>
                <li>Validating form data server and client side.</li>
                <li>Hashing and storing passwords securely.</li>
                <li>Some CSS tricks, even though the page design is far from great.</li>
            </ul>
        </div>
    )
}
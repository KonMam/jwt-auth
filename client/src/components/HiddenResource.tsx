import { useContext, useEffect, } from "react";
import AppContext from "../AppContext";

export default function HiddenResource() {

    const { 
        navigate,
        username,
        loading, 
        setLoading 
    } = useContext(AppContext)

    const handleSignOut = () => {
        setLoading?.(true)
        localStorage.clear()
        navigate?.('/login')
    }

    useEffect(() => {

        setLoading?.(true)

        if (!localStorage.getItem('authenticated')) {
            navigate?.('/login')
            return;
        }

        fetch('/api/refresh',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
        }).then(response => {
            if (response.status !== 200) {
                navigate?.('/login')
            } else {
                setLoading?.(false)
                if (username) {
                    localStorage.setItem('authenticated', username)
                }
            }
        })
    }, [])


    if (loading) {
        return <></>
    } else {
        return (<div className="hidden-resource">
            <h1>You should only see this after logging in!</h1>
            <img src="./cat.png"></img>
            <button onClick={handleSignOut}>Log Out</button>
        </div>
        )
    }
}
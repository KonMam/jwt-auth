import { useContext, useEffect, useRef, useState, } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { DataFetch, dragRef } from "../types";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import AppContext from "../contexts/AppContext";

export default function KanBan() {

    const { 
        navigate,
        username,
        loading, 
        setLoading 
    } = useContext(AppContext)

    const [tasks, setTasks] = useState<DataFetch[]>([])

    const dragItemRef = useRef<null | dragRef>(null)
    const dragOverItemRef = useRef<null | dragRef>(null)

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
        }).then(() => 
            fetch('/api/tasks')
            .then(response => response.json())
            .then((data: DataFetch[]) => setTasks(data)))

    }, [])

    if (loading) {
        return <></>
    }
    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            <div className="board">
                <button onClick={handleSignOut}>Sign Out</button>
                <TaskForm/>
                <div className="list-container">
                    <TaskList 
                        title="To Do" 
                        dragItemRef={dragItemRef} 
                        dragOverItemRef={dragOverItemRef}
                    />
                    <TaskList 
                        title="In Progress" 
                        dragItemRef={dragItemRef} 
                        dragOverItemRef={dragOverItemRef}
                    />
                    <TaskList 
                        title="Completed" 
                        dragItemRef={dragItemRef} 
                        dragOverItemRef={dragOverItemRef} 
                    />
                </div>
            </div>
        </TaskContext.Provider>
    )
}


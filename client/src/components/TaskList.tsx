import { useContext } from "react"
import { TaskContext } from "../contexts/TaskContext"
import { DataFetch, dragRef } from "../types"

export default function TaskList( props: {
    title: string, 
    dragItemRef: React.MutableRefObject<dragRef | null>,
    dragOverItemRef: React.MutableRefObject<dragRef | null>,
    }) {

    const { tasks, setTasks } = useContext(TaskContext)

    const dragItemRef = props.dragItemRef
    const dragOverItemRef = props.dragOverItemRef

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        fetch('/api/tasks', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId: index,
            })
        })

        const tasksCopy = tasks.filter(task => task.id !== index)

        setTasks(tasksCopy)
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number, status: string) => {
        dragItemRef.current = {
            index: index, 
            status: status
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number, status: string) => { 
        e.preventDefault();
        dragOverItemRef.current = {
            index: index, 
            status: status
        }
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        if (dragItemRef.current && dragOverItemRef.current) {

            if (dragItemRef.current.status === dragOverItemRef.current.status) {
                return;
            }

            const tasksCopy = tasks.map( object => {
                if (object.id === dragItemRef.current?.index) {

                    fetch('/api/tasks', {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            taskId: dragItemRef.current.index,
                            newStatus: dragOverItemRef.current?.status
                        })
                    })

                    return {...object, 
                    status: dragOverItemRef.current?.status}

                }

                return object;
            })

            setTasks(tasksCopy)
        }             
    }

    return (
        <div className="task-container">
            <h2>{props.title}</h2>
            {tasks.filter(task => task.status === props.title).length === 0 ? 
                <div className="task" 
                    draggable 
                    onDragStart={e => handleDragStart(e, 0, props.title)}
                    onDragOver={e => handleDragOver(e, 0, props.title)}
                    onDragEnd={e => handleDragEnd(e)}
                > 
                </div> : tasks.filter(data => 
                    {return data.status == props.title}).map(task => {
                        return (
                            <div className="task" 
                                key={task.id}
                                draggable 
                                onDragStart={e => handleDragStart(e, task.id, props.title)}
                                onDragOver={e => handleDragOver(e, task.id, props.title)}
                                onDragEnd={e => handleDragEnd(e)}
                            >   
                                <div className="task-header">
                                    <p className="task-title">{task.title}</p>
                                    <button 
                                        className="task-delete-button"
                                        onClick={e => handleDelete(e, task.id)}
                                        >X</button>
                                </div>
                                <p className="task-description">{task.description}</p>
                                <div className="task-date-container">
                                    <p className="task-date">Created: {task.createdDate?.toString().slice(0,10)}</p>
                                    <p className="task-date">Updated: {task.updatedDate?.toString().slice(0,10)}</p>
                                </div>
                            </div>)}
                )}
        </div>)
}
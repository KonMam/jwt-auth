import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { DataFetch, dragRef } from "../types";


const updateTask = async<T, K extends keyof T>(data: T, key: K, value: T[K]) => {

    const payload = {
        ...data, [key]: value
    }

    await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            payload)
        
    }).then(response => {return response.json()})
}

export default function Task(props: {
        data: DataFetch | null,
        title: string, 
        dragItemRef: React.MutableRefObject<dragRef | null>,
        dragOverItemRef: React.MutableRefObject<dragRef | null>
    }) {

    const {tasks, setTasks} = useContext(TaskContext)
    const data = props.data
    const dragItemRef = props.dragItemRef
    const dragOverItemRef = props.dragOverItemRef
    
    const handleDelete = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, index: number) => {
        fetch('/api/tasks', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId: index,
            })
        })

        const tasksCopy = tasks!.filter(task => task.id !== index)
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

            const tasksCopy = tasks!.map( object => {

                if (object.id === dragItemRef.current?.index) {

                    if (!dragOverItemRef.current) {
                        return;
                    }
                    updateTask(object, "status", dragOverItemRef.current.status)
                    return {...object, status: dragOverItemRef.current.status}
                }
                return object;
            })
            setTasks(tasksCopy)
        }             
    }

    const [editable, setEditable] = useState<boolean>(false)

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setEditable(true)
    }

    const handleBlur = (
            e: React.FocusEvent<HTMLDivElement, Element>, key: keyof DataFetch
        ) => {
        e.preventDefault()
        setEditable(false)

        if (!data) {
            return;
        }

        updateTask(data, key, e.target.innerText)
    }

    if (!data) {
        return (
        <div 
            className="task"
            draggable
            onDragStart={e => handleDragStart(e, 0, props.title)}
            onDragOver={e => handleDragOver(e, 0, props.title)}
            onDragEnd={e => handleDragEnd(e)}
        > 
        </div>)
    }

    return (
        <div className="task" 
            key={data.id}
            draggable 
            onDragStart={e => handleDragStart(e, data.id, props.title)}
            onDragOver={e => handleDragOver(e, data.id, props.title)}
            onDragEnd={e => handleDragEnd(e)}
        > 
            <div className="task-header">
                <div 
                    className="task-title"
                    onClick={e => handleClick(e)}
                    contentEditable={editable}
                    spellCheck="false"
                    onBlur={e => handleBlur(e, "title")}
                >
                    {data.title}
                </div>
                <img src="/trash3.svg" 
                    className="task-delete-button"
                    onClick={e => handleDelete(e, data.id)}
                    width="30px">
                </img>
            </div>
            <div 
                className="task-description"
                onClick={e => handleClick(e)}
                contentEditable={editable}
                spellCheck="false"
                onBlur={e => handleBlur(e, "description")}
            >
                {data.description}
            </div>
            <div className="task-date-container">
                <div className="task-date">Created: {data.createdDate?.toString().slice(0,10)}</div>
                <div className="task-date">Updated: {data.updatedDate?.toString().slice(0,10)}</div>
            </div>
        </div>)
}
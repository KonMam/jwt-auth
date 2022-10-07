import { useContext, useRef } from "react"
import { TaskContext } from "../contexts/TaskContext"


export default function TaskForm() {
    
    const {tasks, setTasks} = useContext(TaskContext)

    const titleRef = useRef<HTMLInputElement | null>(null)
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (titleRef.current && descriptionRef.current) {

            fetch('/api/tasks', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: titleRef.current.value, 
                    description: descriptionRef.current.value,
                    status: "To Do"
                })
            }).then(data => data.json())

            if (!tasks) {
                return;
            }

            const tasksCopy = [...tasks]

            tasksCopy.unshift({
                id: tasks.length + 1,
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                status: "To Do",
                createdDate: new Date(),
                updatedDate: new Date()
            })

            titleRef.current.value = ''
            descriptionRef.current.value = ''

            setTasks(tasksCopy)
        }

    }

    return (
        <form className="task-form" onSubmit={e => handleSubmit(e)}>
            <h2>New Task</h2>
            <input
                className="form-field"
                ref={titleRef} 
                placeholder="Title">
            </input>
            <textarea 
                className="form-field"
                ref={descriptionRef} 
                placeholder="Description">
            </textarea>
            <button
                className="form-button"
            >
            Submit
            </button>
        </form>
    )
}
import { useContext, useRef } from "react"
import { TaskContext } from "../contexts/TaskContext"


export default function TaskForm() {
    
    const {tasks, setTasks} = useContext(TaskContext)

    const titleRef = useRef<HTMLInputElement | null>(null)
    const descriptionRef = useRef<HTMLInputElement | null>(null)

    
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
            <input ref={titleRef} placeholder="Title"></input>
            <input ref={descriptionRef} placeholder="Description"></input>
            <button>Submit</button>
        </form>
    )
}
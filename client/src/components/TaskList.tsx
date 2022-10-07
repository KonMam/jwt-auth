import { useContext } from "react"
import { TaskContext } from "../contexts/TaskContext"
import { dragRef } from "../types"
import Task from "./Task"

export default function TaskList( props: {
    title: string, 
    dragItemRef: React.MutableRefObject<dragRef | null>,
    dragOverItemRef: React.MutableRefObject<dragRef | null>,
    }) {

    const { tasks } = useContext(TaskContext)

    const dragItemRef = props.dragItemRef
    const dragOverItemRef = props.dragOverItemRef

    const title = props.title

    if (!tasks) {
        return <></>
    }

    if (tasks.filter(task => task.status === props.title).length === 0) {
        return (
            <div className="task-container">
                <h2>{props.title}</h2>
                <Task 
                    data={null} 
                    title={title} 
                    dragItemRef={dragItemRef}
                    dragOverItemRef={dragOverItemRef}
                />
            </div>
        )
    }

    return (
        <div className="task-container">
            <h2>{props.title}</h2>
            {tasks.filter(data => { 
                    return data.status == props.title}).map(task => { 
                        return (
                            <Task 
                                data={task} 
                                title={title} 
                                dragItemRef={dragItemRef}
                                dragOverItemRef={dragOverItemRef}
                            /> 
                        )
                    })
            }
        </div>
    )
}
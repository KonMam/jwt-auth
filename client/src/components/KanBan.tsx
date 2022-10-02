import { useContext, useEffect, useRef, useState, } from "react";
import AppContext from "../AppContext";
import Category from "./Category";

type Data = {
    title?: string;
    description?: string;
    status?: string;
    date?: string;
}

type dragRef = {
    index: number;
    status: string
    items: Data[];
    setItems: Function;
}

export default function KanBan() {

    const [todo, setToDo] = useState<Data[]>([])
    const [inprogress, setInprogress] = useState<Data[]>([])
    const [completed, setCompleted] = useState<Data[]>([])

    const dragItemRef = useRef<null | dragRef>(null)
    const dragOverItemRef = useRef<null | dragRef>(null)

    useEffect(() => {
        fetch('/tasks.json')
        .then(response => response.json())
        .then((data: Data[]) => {
            setToDo(data.filter(data => data.status === "To Do"))
            setInprogress(data.filter(data => data.status === "In Progress"))
            setCompleted(data.filter(data => data.status === "Completed"))
        })
    }, [])


    return (
        <div className="kanban">
            <Category 
                items={todo} 
                setItems={setToDo} 
                status="To Do" 
                dragItemRef={dragItemRef} 
                dragOverItemRef={dragOverItemRef}
            />
            <Category 
                items={inprogress} 
                setItems={setInprogress} 
                status="In Progress" 
                dragItemRef={dragItemRef} 
                dragOverItemRef={dragOverItemRef}
            />
            <Category 
                items={completed} 
                setItems={setCompleted} 
                status="Completed" 
                dragItemRef={dragItemRef} 
                dragOverItemRef={dragOverItemRef}
            />
        </div>
    )
}


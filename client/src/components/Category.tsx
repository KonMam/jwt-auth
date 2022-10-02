
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

export default function Category(props: {
        items: Data[], 
        setItems: Function,
        status: string
        dragItemRef: React.MutableRefObject<dragRef | null>,
        dragOverItemRef: React.MutableRefObject<dragRef | null>,}) {

    const dragItemRef = props.dragItemRef
    const dragOverItemRef = props.dragOverItemRef

    const handleDragStart = (
        event: React.DragEvent<HTMLDivElement>, 
        index: number, 
        status: string, 
        items: Data[], 
        setItems: Function
    ) => {
        dragItemRef.current = {
            index: index, 
            status: status, 
            items: items, 
            setItems: setItems
        }
    }

    const handleDragOver = (
            event: React.DragEvent<HTMLDivElement>, 
            index: number, 
            status: string, 
            items: Data[], 
            setItems: Function
        ) => { 
        event.preventDefault();
        dragOverItemRef.current = {
            index: index, 
            status: status, 
            items: items, 
            setItems: setItems
        }
    }

    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {

        if (dragItemRef.current && dragOverItemRef.current) {

            if (dragItemRef.current.index === dragOverItemRef.current.index && 
                dragItemRef.current.status === dragOverItemRef.current.status) {
                return;
            }

            if (dragItemRef.current.items === dragOverItemRef.current.items) {
                const copyListItems = [...dragItemRef.current.items];
                const dragItemContent = copyListItems[dragItemRef.current.index];

                copyListItems.splice(dragItemRef.current.index, 1)
                copyListItems.splice(dragOverItemRef.current.index, 0, dragItemContent);

                dragOverItemRef.current.setItems(copyListItems)
                return;
            }

            const copyListItems = [...dragItemRef.current.items];
            const copyDragOverItems = [...dragOverItemRef.current.items];

            const dragItemContent = copyListItems[dragItemRef.current.index];

            dragItemContent.status = dragOverItemRef.current.status

            copyListItems.splice(dragItemRef.current.index, 1)
            copyDragOverItems.splice(dragOverItemRef.current.index, 0, dragItemContent);


            dragItemRef.current.setItems(copyListItems)
            dragOverItemRef.current.setItems(copyDragOverItems)

        }             

        dragItemRef.current = null;
        dragOverItemRef.current = null;
    }

    return (
        <div className="category">
            <h2>{props.status}</h2>
            {props.items.length === 0 ? 
            <div className="hidden card" 
                draggable 
                onDragStart={e => handleDragStart(e, 0, props.status, props.items, props.setItems)}
                onDragOver={e => handleDragOver(e, 0, props.status, props.items, props.setItems)}
                onDragEnd={e => handleDragEnd(e)}> 
            </div> : props.items ? 
                props.items.filter(data => 
                    {return data.status == props.status})
                    .map((task, index) => 
                        {return (
                            <div className="card" 
                            key={index}
                            draggable 
                            onDragStart={e => handleDragStart(e, index, props.status, props.items, props.setItems)}
                            onDragOver={e => handleDragOver(e, index, props.status, props.items, props.setItems)}
                            onDragEnd={e => handleDragEnd(e)}>
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                                <p>{task.date}</p>
                            </div>)}
                        ) : <p>loading</p>
            }
        </div>)
}
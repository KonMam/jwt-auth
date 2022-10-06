import React from "react";
import { DataFetch, dragRef } from "../types";


interface ContextType {
    tasks: DataFetch[],
    setTasks: Function
}

export const TaskContext = React.createContext<ContextType>({
    tasks: [],
    setTasks: () => {},
});


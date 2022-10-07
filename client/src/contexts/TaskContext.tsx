import React from "react";
import { DataFetch, dragRef } from "../types";


interface ContextType {
    tasks: DataFetch[] | null,
    setTasks: Function
}

export const TaskContext = React.createContext<ContextType>({
    tasks: [],
    setTasks: () => {},
});


import React from "react";

interface ContextType {
    email?: string;
    username?: string;
    password?: string;
    loading: boolean;
    navigate?: Function;
    setEmail?: Function;
    setUsername?: Function;
    setPassword?: Function;
    setLoading?: Function;
}

const AppContext = React.createContext<ContextType>({loading: true});

export default AppContext
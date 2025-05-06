/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    return <AppContext.Provider value={{token, setToken}}>
        {children}
    </AppContext.Provider>
}
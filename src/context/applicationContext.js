import { createContext, useContext, useState } from "react";

const Context = createContext();

export const ApplicationGlobalContext = ({children}) => {

    const [token, setToken] = useState("");
    return (
        <Context.Provider value={{
            token, setToken
        }}>
            {children}
        </Context.Provider>
    )
}

export const useApplicationProvider = () => useContext(Context);
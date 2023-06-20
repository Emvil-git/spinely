import { createContext, useContext, useState } from "react";

const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [history, setHistory] = useState([]);
    const [progress, setProgress] = useState([]);
    const [calibration, setCalibration] = useState(JSON.parse(localStorage.getItem('calibration')));

    return (
        <AppContext.Provider value={{user,setUser, history, setHistory, calibration, setCalibration}}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => useContext(AppContext);
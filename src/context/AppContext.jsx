import { createContext, useContext, useState } from "react";

const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [history, setHistory] = useState([]);
    const [progress, setProgress] = useState([]);
    const [calibration, setCalibration] = useState(JSON.parse(localStorage.getItem('calibration')));
    const [name, setName] = useState('');
    // const testerData = [
    //     {
    //         dayNo: 1,
    //         n: 2140,
    //         c: 28800,
    //         dateTime: "2023-05-04 15:14:07",
    //     },
    //     {
    //         dayNo: 2,
    //         n: 2270,
    //         c: 28800,
    //         dateTime: "2023-05-09 13:20:15"
    //     },
    //     {
    //         dayNo: 3,
    //         n: 2470,
    //         c: 32400,
    //         dateTime: "2023-05-11 14:45:02"
    //     },
    //     {
    //         dayNo: 4,
    //         n: 2140,
    //         c: 28800,
    //         dateTime: "2023-05-18 13:33:54"
    //     }
    // ]

    const mockOverall1 = 75.9259259259259
    const mockOverall2 = 85.9259259259259

    return (
        <AppContext.Provider value={{user,setUser, history, setHistory, calibration, setCalibration, name, setName, progress, setProgress, mockOverall1, mockOverall2}}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => useContext(AppContext);
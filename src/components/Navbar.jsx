import styles from './Navbar.module.css';
import { GraphUp,ClockHistory, Gear, BoxArrowRight, PeopleFill } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
    const navigate = useNavigate();
    const [currentRoute, setCurrentRoute] =useState('/')
    const {user, setUser, calibration, setCalibration, history, setHistory, progress, setProgress} = useAppContext();
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('not-connected');
    const [currentSessionNumber, setCurrentSessionNumber] = useState(null);

    // check if calibration data exists
    useEffect(()=>{
        if(user){
                console.log(user)
                fetch(`http://localhost:4000/calibration/checkData`, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
                    }
                }).then(res => res.json())
                .then(
                    data => {
                        if(data.calibrationExists) {
                            fetch(`http://localhost:4000/calibration/getData`, {
                                headers: {
                                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
                                }
                            }).then(res => res.json())
                            .then(data => {
                                localStorage.setItem('calibration', JSON.stringify(data.result[0]))
                                setCalibration(data.result[0]);
                                console.log(calibration);
                            });
                        }
                    }
                );
        }
    }, [user]);

    useEffect(() => {
        if(user){
            console.log(user)
            fetch(`http://localhost:4000/session/get`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
                }
            }).then(res => res.json())
            .then(
                data => {
                    setHistory(data.result);
                    console.log(data.result);

                    const isSessionStartedToday = history.some(entry => {
                        const entryDate = new Date(entry.createdAt);
                        const today = new Date();
        
                        return (
                            entryDate.getDate() === today.getDate() &&
                            entryDate.getMonth() === today.getMonth() &&
                            entryDate.getFullYear() === today.getFullYear()
                        );
                    });
                    // If a session hasn't started for the day, update the session ID
                    if (!isSessionStartedToday) {
                        // Fetch the latest session ID and increment it
                        const latestSessionId = Math.max(...history.map(entry => entry.sessionId));
                        const newSessionId = latestSessionId + 1;

                        // Update the session ID in your backend (replace this with your actual API call)
                        fetch(`http://localhost:4000/session/updateSessionId`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
                            },
                            body: JSON.stringify({
                                newSessionId: newSessionId
                            })
                        }).then(res => res.json())
                        .then(data => {
                            // Handle the response if needed
                        });

                        // Update the local state with the new session ID
                        setHistory(prevHistory => [
                            ...prevHistory,
                            {
                                // Add other session data as needed
                                sessionId: newSessionId,
                                // ...
                            }
                        ]);
                    }
                });
            }
    }, [user]);

    useEffect(() => {
        if(user){
            if(history.length) {
                const historyIds = history.map(entry => {return entry.sessionId});
                const latestId = Math.max(...historyIds);

                console.log(latestId)

                fetch(`http://localhost:4000/progress/get/${latestId}`).then(res => res.json())
                .then(
                    data => {
                        setProgress(data.result);
                        console.log(data.result);
                    }
                );
            }
        }
    },[user, history]);


    const highlightRoute = (route) => {
        return currentRoute === route ? `${styles.current} text-align-left px-5 py-3 text-dark rounded` : `${styles.link} text-align-left px-5 py-3 text-light rounded`;
    }

    const clickRoute = (route) => {
        setCurrentRoute(route)
        navigate(route);
    }

    const logOut = (ev) => {
        ev.preventDefault();

        navigate("/");
        setUser(null);
        setCalibration(null);
        localStorage.removeItem('user');
        localStorage.removeItem('calibration');
    }

    // ATTENTION: This is an attempt to fix session and connection interfacing. SNIPPET STARTS HERE--

    const sendSessionDetails = async (action) => {
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            
            const response = await fetch(`http://localhost:5000/sessionDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action,
                    date: formattedDate
                })
            });
            if (!response.ok) {
                throw new Error('Failed to send session details to the server');
            }
            console.log(`Session details ${action} sent successfully`);
        } catch (error) {
            console.error('Error sending session details to the server:', error);
        }
    };            

    const startMonitoring = async () => {
        // If already monitoring, stop monitoring
        if (isMonitoring) {
            // Prompt confirmation before ending the session
            const confirmEndSession = window.confirm('Are you sure you want to end the session?');
            if (confirmEndSession) {
                // Set 'not connected' status
                setConnectionStatus('not-connected');
                setIsMonitoring(false);
                console.log('Monitoring stopped');
    
                // Send the session end details to the server
                await sendSessionDetails('end');
    
                // Notify that the session has ended
                window.alert('Session ended. Please check History for details and summary.');
    
                return;
            }
            return;
        }
    
        // If not monitoring, start monitoring
        setConnectionStatus('connecting');
    
        try {
            // Establish a connection
            console.log('Connecting to Spinely Wearable');
            await fetch('http://localhost:5000/checkConnection');
            setConnectionStatus('connected');
    
            // Fetch the latest session number
            const latestSessionNumberResponse = await fetch('http://localhost:5000/latestSessionNumber');
            const { latestSessionNumber } = await latestSessionNumberResponse.json();
    
            // Check if the latest session number is the same as the current session number
            if (latestSessionNumber === currentSessionNumber) {
                // If it's the same session, prompt for continuation confirmation
                const confirmContinueSession = window.confirm('Do you want to continue monitoring the existing session?');
                if (confirmContinueSession) {
                    setIsMonitoring(true);
                    console.log('Monitoring continued');
                    // Send the session continued details to the server
                    await sendSessionDetails('continued');
                    // Notify the user that the existing session is continued
                    window.alert('Monitoring continued!');
                } else {
                    setConnectionStatus('not-connected');
                    // Notify the user that the continuation was canceled
                    window.alert('Monitoring continuation canceled.');
                }
            } else {
                // If it's a new session, prompt for confirmation before starting a new session
                const confirmNewSession = window.confirm('Start a new monitoring session?');
                if (confirmNewSession) {
                    setCurrentSessionNumber(latestSessionNumber);
                    setIsMonitoring(true);
                    console.log('New monitoring session started');
                    // Send the session end details to the server
                    await sendSessionDetails('start');
                    // Notify the user that a new session has started
                    window.alert('New monitoring session started!');
                } else {
                    setConnectionStatus('not-connected');
                    // Notify the user that the new session was canceled
                    window.alert('New monitoring session canceled.');
                }
            }
    
            // Other monitoring logic here...
        } catch (error) {
            setConnectionStatus('not-connected');
            console.error('Unable to connect to Spinely Wearable', error);
    
            // Notify that connection is unable
            window.alert('Unable to connect to Spinely. Please check if Spinely is on.');
        }
    };
    
    
    // ATTENTION: This is an attempt to fix session and connection interfacing. SNIPPET ENDS HERE--       

    return (
        <aside className={`${styles.nav} p-2`}>
            <h1 className={`${styles.brand} text-light p-5 ps-4 ms-2`}><PeopleFill className={`${styles.icon} pe-3`}/>Spinely</h1>
            <div className={`${styles.wearableStatus} text-light p-3 ps-4`}>
                Wearable Status: 
                <div>{connectionStatus === 'connecting' && ' Connecting...'}</div>
                <div>{connectionStatus === 'connected' && ' Connected'}</div>
                <div>{connectionStatus === 'not-connected' && ' Not Connected'}</div>
            </div>
            <div className={`${styles.startMonitoringButton} mt-4 rounded`} onClick={startMonitoring}>
                {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </div>
            <ul className={`${styles.links} p-0`}>
                <li className={highlightRoute('/')} onClick={()=>{clickRoute('/')}}><GraphUp className={`${styles.icon} pe-3`}/>Dashboard</li>
                <li className={highlightRoute('/history')} onClick={()=>{clickRoute('/history')}}><ClockHistory className={`${styles.icon} pe-3`}/>History</li>
                <li className={highlightRoute('/settings')} onClick={()=>{clickRoute('/settings')}}><Gear className={`${styles.icon} pe-3`}/>Settings</li>
                <li className={`${styles.logout} text-align-left px-5 py-3 mt-4 rounded`} onClick={logOut}><BoxArrowRight className={`${styles.icon} pe-3`}/>Log out</li>
            </ul>
        </aside>
    );
}

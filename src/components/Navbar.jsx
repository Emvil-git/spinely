import styles from './Navbar.module.css';
import { GraphUp,ClockHistory, Gear, BoxArrowRight, PeopleFill } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
    const navigate = useNavigate();
    const [currentRoute, setCurrentRoute] =useState('/')
    const {user, setUser, calibration, setCalibration} = useAppContext();

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
                            })
                        }
                    }
                )
        }
    }, [user])

    const highlightRoute = (route) => {
        if(currentRoute === route) {
            return `${styles.current} text-align-left px-5 py-3 text-dark rounded`
        } else {
            return `${styles.link} text-align-left px-5 py-3 text-light rounded`
        }
    }

    const clickRoute = (route) => {
        setCurrentRoute(route)
        navigate(route);
    }

    const logOut = (ev) => {
        ev.preventDefault();

        setUser(null);
        setCalibration(null);
        localStorage.removeItem('user');
        localStorage.removeItem('calibration');
    }

    return (
        <aside className={`${styles.nav} p-2`}>
            <h1 className={`${styles.brand} text-light p-5 ps-4 ms-2`}><PeopleFill className={`${styles.icon} pe-3`}/>Spinely</h1>
            <ul className={`${styles.links} p-0`}>
                <li className={highlightRoute('/')} onClick={()=>{clickRoute('/')}}><GraphUp className={`${styles.icon} pe-3`}/>Dashboard</li>
                <li className={highlightRoute('/history')} onClick={()=>{clickRoute('/history')}}><ClockHistory className={`${styles.icon} pe-3`}/>History</li>
                <li className={highlightRoute('/settings')} onClick={()=>{clickRoute('/settings')}}><Gear className={`${styles.icon} pe-3`}/>Settings</li>
                <li className={`${styles.logout} text-align-left px-5 py-3 mt-4 rounded`} onClick={logOut}><BoxArrowRight className={`${styles.icon} pe-3`}/>Log out</li>
            </ul>
        </aside>
    )
}
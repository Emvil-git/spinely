import styles from './Navbar.module.css';
import { GraphUp,ClockHistory, Gear, BoxArrowRight, PeopleFill } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
    const navigate = useNavigate();
    const [currentRoute, setCurrentRoute] =useState('/')
    const {setUser} = useAppContext();

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

    const logOut = () => {
        setUser(null);
    }

    return (
        <aside className={`${styles.nav} p-2`}>
            <h1 className={`${styles.brand} text-light p-5 ps-4 ms-2`}><PeopleFill className={`${styles.icon} pe-3`}/>Spinely</h1>
            <ul className={`${styles.links} p-0`}>
                <li className={highlightRoute('/')} onClick={()=>{clickRoute('/')}}><GraphUp className={`${styles.icon} pe-3`}/>Dashboard</li>
                <li className={highlightRoute('/history')} onClick={()=>{clickRoute('/history')}}><ClockHistory className={`${styles.icon} pe-3`}/>History</li>
                <li className={highlightRoute('/settings')} onClick={()=>{clickRoute('/settings')}}><Gear className={`${styles.icon} pe-3`}/>Settings</li>
                <li className={`${styles.logout} text-align-left px-5 py-3 mt-4 rounded`} onClick={() => {setUser(null)}}><BoxArrowRight className={`${styles.icon} pe-3`}/>Log out</li>
            </ul>
        </aside>
    )
}
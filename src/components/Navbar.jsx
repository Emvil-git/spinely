import styles from './Navbar.module.css';
import { GraphUp,ClockHistory, Gear, BoxArrowRight, PeopleFill } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const [currentRoute, setCurrentRoute] =useState('/')

    const highlightRoute = (route) => {
        if(currentRoute === route) {
            return styles.current
        } else {
            return styles.link
        }
    }

    const clickRoute = (route) => {
        setCurrentRoute(route)
        navigate(route);
    }

    return (
        <aside className={`${styles.nav} bg-primary p-2`}>
            <h1 className={`${styles.brand} text-light p-5`}><PeopleFill className={`${styles.icon} pe-3`}/>Spinely</h1>
            <ul className={`${styles.links} p-0`}>
                <li className={`${styles.link} text-align-left px-5 py-3 text-light rounded`} onClick={()=>{navigate('/')}}><GraphUp className={`${styles.icon} pe-3`}/>Dashboard</li>
                <li className={`${styles.link} text-align-left px-5 py-3 text-light rounded`} onClick={()=>{navigate('/history')}}><ClockHistory className={`${styles.icon} pe-3`}/>History</li>
                <li className={`${styles.link} text-align-left px-5 py-3 text-light rounded`} onClick={()=>{navigate('/settings')}}><Gear className={`${styles.icon} pe-3`}/>Settings</li>
                <li className={`${styles.link} text-align-left px-5 py-3 text-light rounded`}><BoxArrowRight className={`${styles.icon} pe-3`}/>Log out</li>
            </ul>
        </aside>
    )
}
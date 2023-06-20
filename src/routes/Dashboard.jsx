import styles from './Dashboard.module.css';
import Profile from '../components/Profile';
import Calendar from 'react-calendar';
import SessionDay from './SessionDay';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Dashboard() {
    const {user, calibration, setCalibration} = useAppContext();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    },[user])

    return (
        <div className={`${styles.main} page`}>
            <section className={`${styles.left}`}>
                <h2 className={`${styles.top}`}>hello</h2>
                <section className={`${styles.leftcont}`}>
                    <SessionDay/>
                    <SessionDay/>
                    <SessionDay/>
                    <SessionDay/>
                </section>
            </section>
            <section className={`${styles.right}`}>
                <div className={`${styles.cont} ${styles.top} rounded`}>
                    <Profile/>
                </div>
                <section className={`${styles.leftcont}`}>
                    <div className={`${styles.cont} rounded`}><Calendar/></div>
                    <div className={`${styles.cont} ${styles.imgdiv} rounded`}>
                        <div className={`${styles.observed} rounded`}>
                            <div className={styles.circle}>90%</div>
                            <span>Proper posture observed</span>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}
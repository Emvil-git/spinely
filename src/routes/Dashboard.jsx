import styles from './Dashboard.module.css';
import Profile from '../components/Profile';
import Calendar from 'react-calendar';
import SessionDay from './SessionDay';
import CircProgBar from '../components/ProgressBar';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Dashboard() {
    const {user, calibration, setCalibration, progress, name} = useAppContext();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    },[user])

    const displayProgress = () => {
        if (progress.length) {
            return progress.map((entry, index) => <SessionDay index={index} reportData={entry}/>)
        } else {
            return <span>No progress reports available</span>
        }
    }

    return (
        <div className={`${styles.main} page`}>
            <section className={`${styles.left}`}>
                <h2 className={`${styles.top}`}>Hello, <span className={styles.name}>{name.split(' ')[0]}</span></h2>
                <section className={`${styles.leftcont}`}>
                    {/* <SessionDay/>
                    <SessionDay/>
                    <SessionDay/>
                    <SessionDay/> */}
                    {displayProgress()}
                    {/* Add line graph here */}
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
                            <CircProgBar/>
                            {/* TODO: Labels and dates */}
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}
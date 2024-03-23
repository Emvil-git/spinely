import styles from './Dashboard.module.css';
import Profile from '../components/Profile';
import Calendar from 'react-calendar';
import SessionDay from './SessionDay';
// import History from './History';
import CircProgBar from '../components/ProgressBar';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Dashboard() {
    const {user, history, name, mockOverall1} = useAppContext();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    },[user])

    // const displayProgress = () => {
    //     if (progress.length) {
    //         return progress.map((entry, index) => <SessionDay index={index} reportData={entry}/>)
    //     } else {
    //         return <span>No progress reports available</span>
    //     }
    // }

    const getPercentPropers = () => {
        const percentPropers = history.map(data => data.percent_proper).filter(val => val !== undefined && val !== null);
        
        if (percentPropers.length === 0) {
            return 0; // or any default value you prefer
        }
    
        const sum = percentPropers.reduce((total, currentValue) => total + currentValue, 0);
        return sum / percentPropers.length;
    }
    

    const testProgress = () => {
        return history.map((data, index) => <SessionDay key={data.id} historyData={data} sessionNumber={index+1}/>)
        // testerData.map(entry => <SessionDay data={entry}/>)
        // history.map((data, index) => <HistoryEntry key={data.id} historyData={data} sessionNumber={index + 1} />)
    }

    // const scoringProgress = () => {
    //     if(progress.length) {
    //         const scoresTotal = progress.map(report => {return report.})
    //     }
    // }

    console.log(history);
    var latestoverall = 0;
    if (history.length !=0){
        let sessionId = 0;
        for (var i=0; i< history.length;i++) {
            if (history[i].sessionId > sessionId){
                sessionId = history[i].sessionId;
            }
        }
        const latestsession = history.find(item => item.sessionId == sessionId);
        latestoverall = latestsession.percent_proper;    
    }

    return (
        <div className={`${styles.main} page`}>
            <section className={`${styles.left}`}>
                <h2 className={`${styles.top}`}>Hello, <span className={styles.name}>{name.split(' ')[0]}</span></h2>
                <section className={`${styles.leftcont}`}>
                    {testProgress()}
                </section>
            </section>
            <section className={`${styles.right}`}>
                <div className={`${styles.cont} ${styles.top} rounded`}>
                    <Profile/>
                </div>
                <section className={`${styles.leftcont}`}>
                    <div className={`${styles.cont} rounded`}><Calendar/></div>
                    <div className={`${styles.cont} ${styles.imgdiv} rounded`}><div className={`${styles.observed} rounded`}><CircProgBar scoreVal={latestoverall} textVal={"Current Posture Progress"}/><CircProgBar scoreVal={getPercentPropers()} textVal={"Overall Posture Progress"}/></div></div>
                    {/* <p>Average Percent Proper (For debug only): {getPercentPropers()}</p>*/}
                </section>
            </section>
        </div>
    )
}
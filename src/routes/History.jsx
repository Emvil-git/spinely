import React, { useEffect }  from 'react';
import styles from './History.module.css';
import Profile from '../components/Profile';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function History() {
  const {user, history} = useAppContext();
  const navigate = useNavigate();

  useEffect(()=>{
      if(!user){
          navigate('/login');
      }
  },[user])

  // useEffect(() => {
    
  // })

  const showHistory = () => {
    if (history.length > 0) {
      return history.map(data => <HistoryEntry historyData={data}/>)
    } else {
      return <span>No sessions found for this user</span>
    }
  }

  return (
    <div className={`${styles.main} page`}>
      <div className={`${styles.top} bg-light rounded`}>
        <Profile/>
      </div>
      <section className={`${styles.cont} bg-light rounded`}>
        {/* <div className={`${styles.entry} border border-secondary rounded`}>
          <span>History entry 1</span>
          <span>4:20 PM</span>
        </div>
        <HistoryEntry/> */}
        {showHistory()}
      </section>
    </div>
  )
}

function HistoryEntry({historyData}) {
  return (
    <div className={`${styles.entry} border border-secondary rounded`}>
      <span>{`You maintained proper posture ${historyData.percent_proper}% of the time`}</span>
      <section className='d-flex text-bold'>
        <span className='me-3'>{historyData.time_start}</span>
        <span>{historyData.time_end}</span>
      </section>
    </div>
  )
}

export default History
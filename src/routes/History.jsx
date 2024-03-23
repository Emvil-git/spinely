import React, { useEffect, useState } from 'react';
import styles from './History.module.css';
import Profile from '../components/Profile';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function History() {
  const { user, history } = useAppContext();
  const [ selectedhistory,  setSelectedhistory ] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  // useEffect(()=>{retrieve},[selectedhistory])
  
  var sessiondata = {}
  if (selectedhistory){
    sessiondata = history.find(item => item.sessionId == selectedhistory);
    console.log(sessiondata);
  }
  
  return (
    <div className={`${styles.main} page`}>
      {/* User profile */}
      <div className={`${styles.top} bg-light rounded`}>
        <Profile />
      </div>
      {/* History entries */}
      <section className={`${styles.cont} bg-light rounded`}>
        {history.length > 0 && history.map((data, index) => <HistoryEntry key={data.id} historyData={data} sessionNumber={index + 1} setSelectedhistory = {setSelectedhistory}/>)}
      </section>
      {/* {sessiondata.} */}
    </div>
  );
}

function HistoryEntry({ historyData, sessionNumber, setSelectedhistory }) {
  if (!historyData || historyData.percent_proper === undefined) {
    return (
      <div className={`${styles.noRecords} bg-light rounded d-flex justify-content-center align-items-center`}>
        <span>No records in this part. Start monitoring to add an entry.</span>
      </div>
    );
  }

  if (historyData.percent_proper === null) {
    return (
      <div className={`${styles.entry} border border-secondary rounded`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold">Session {getOrdinal(sessionNumber)}</span>
          <span className="ms-3">{formatSessionDuration(historyData.date_start, historyData.date_end)}</span>
        </div>
      </div>
    );    
  }
  function selecthistory (sessionId){
    setSelectedhistory(sessionId);
    console.log(sessionId);
  }


  return (
    <div className={`${styles.entry} border border-secondary rounded`}>
      {/* Display session number and duration */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold">Session {getOrdinal(sessionNumber)}</span>
        <span className="ms-3">{formatSessionDuration(historyData.date_start, historyData.date_end)}</span> {/* Add margin between session number and duration */}
      </div>
      {/* Display percentage of proper posture */}
      <span>You maintained proper posture {historyData.percent_proper.toFixed(2)}% of the time. <a href="#" onClick={()=>{
        localStorage.setItem("selectedsession", historyData.sessionId)
        selecthistory(localStorage.getItem('selectedsession'))
      }}>See more...</a></span>
    </div>
  );
}

function formatSessionDuration(start, end) {
  const startDate = new Date(start);
  let endDate;
  let endFormatted;

  if (end === null) {
    endFormatted = "Present";
  } else {
    endDate = new Date(end);
    endFormatted = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
  }

  const startFormatted = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
  const endFormattedTimeOnly = endDate ? endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : '';

  if (endFormatted === "Present" || startDate.toDateString() === endDate.toDateString()) {
    if (startDate.toDateString() === endDate.toDateString() && startDate.getTime() !== endDate.getTime()) {
      return `${startFormatted} - ${endFormattedTimeOnly}`;
    } else {
      return `${startFormatted} - ${endFormatted}`;
    }
  } else {
    return `${startFormatted} - ${endFormatted}`;
  }
}

function getOrdinal(n) {
  return `${n}`;
}


export default History;

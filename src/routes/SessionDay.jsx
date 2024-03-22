import React from 'react'
import styles from './SessionDay.module.css'

function SessionDay({historyData,sessionNumber}) {

  if (!historyData || historyData.percent_proper === undefined) {
    return null;
  }

  if (historyData.percent_proper === null) {
    return (
      <div className={`${styles.main} rounded p-4 mb-3`}>
          <span>{`Session {getOrdinal(sessionNumber)}`}</span>
          <span>{formatSessionDate(historyData.date_start, historyData.date_end)}</span>
      </div>
    );    
  }
  return (
    <div className={`${styles.main} rounded p-4 mb-3`}>
      <span>Session {getOrdinal(sessionNumber)}</span>
      <span>{historyData.percent_proper.toFixed(2)}</span>
      <span>{formatSessionDate(historyData.date_start, historyData.date_end)}</span>
    </div>
  );
}

function formatSessionDate(start, end) {
  const startDate = new Date(start);
  let endDate;

  if (end === null) {
    return "Ongoing";
  } else {
    endDate = new Date(end);
    if (startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate()) {
      const day = startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate();
      return startDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } else if (startDate.getFullYear() === endDate.getFullYear() &&
               startDate.getMonth() === endDate.getMonth()) {
      return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}-${endDate.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
    } else if (startDate.getFullYear() === endDate.getFullYear()) {
      return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}-${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
  }
}


function getOrdinal(n) {
  return `${n}`;
}

// function SessionDay({data}) {

//   const dailyProg = (data.n * (10 / data.c))*100

//   return (
//     <div className={`${styles.main} rounded p-4 mb-3`}>
//         <span>{`Session ${data.dayNo}`}</span>
//         <span>{dailyProg.toFixed(2)}</span>
//         <span>{data.dateTime}</span>
//     </div>
//   )
// }

export default SessionDay;
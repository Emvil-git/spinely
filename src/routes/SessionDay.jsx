import React from 'react'
import styles from './SessionDay.module.css'

function SessionDay({index, reportData}) {
  return (
    <div className={`${styles.main} rounded p-4 mb-3`}>
        <span>{`Day ${index + 1}`}</span>
        <span>{reportData.result_proper}</span>
        <span>{reportData.progress_proper}</span>
        <span>{reportData.date_time}</span>
    </div>
  )
}

export default SessionDay
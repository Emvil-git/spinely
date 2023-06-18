import React from 'react'
import styles from './SessionDay.module.css'

function SessionDay() {
  return (
    <div className={`${styles.main} rounded p-4 mb-3`}>
        <span>Day 1</span>
        <span>10%</span>
        <span>Start: [date]</span>
        <span>End: [date]</span>
    </div>
  )
}

export default SessionDay
import React from 'react'
import styles from './History.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function History() {
  return (
    <div className={`${styles.main} bg-secondary page`}>
      <div className={`${styles.top} bg-light rounded`}>
        Profile
      </div>
      <section className={`${styles.cont} bg-light rounded`}>
        <div className={`${styles.entry} border border-secondary rounded`}>
          <span>History entry 1</span>
          <span>4:20 PM</span>
        </div>
        <div className={`${styles.entry} border border-secondary rounded`}>
          <span>History entry 1</span>
          <span>4:20 PM</span>
        </div>
        <div className={`${styles.entry} border border-secondary rounded`}>
          <span>History entry 1</span>
          <span>4:20 PM</span>
        </div>
        <div className={`${styles.entry} border border-secondary rounded`}>
          <span>History entry 1</span>
          <span>4:20 PM</span>
        </div>
        <div className={`${styles.entry} border border-secondary rounded`}>
          <span>History entry 1</span>
          <span>4:20 PM</span>
        </div>
        <div className={`${styles.entry} border border-secondary rounded`}>
          <span>History entry 1</span>
          <span>4:20 PM</span>
        </div>
        <div className={`${styles.entry} border border-secondary rounded`}>
          <span>History entry 1</span>
          <span>4:20 PM</span>
        </div>
        <div className={`${styles.entry} border border-secondary rounded`}>
          <span>History entry 1</span>
          <span>4:20 PM</span>
        </div>
        <div className={`${styles.entry} border border-secondary rounded`}>
          <span>History entry 1</span>
          <span>4:20 PM</span>
        </div>
      </section>
    </div>
  )
}

export default History
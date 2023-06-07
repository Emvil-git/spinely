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
      <section className={`${styles.cont}`}>

      </section>
    </div>
  )
}

export default History
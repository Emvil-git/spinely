import React from 'react'
import styles from './Settings.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Settings() {
  return (
    <div className={`${styles.main} bg-secondary page`}>
        <div className={`${styles.top} bg-light rounded`}>
            Profile
        </div>
        <section className={styles.cont}>
            <Tabs
              defaultActiveKey="edit-profile"
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="edit-profile" title="Edit Profile">
                <div className={`${styles.content} bg-light rounded-bottom`}>Edit Profile</div>
              </Tab>
              <Tab eventKey="device" title="Device">
                <div className={`${styles.content} bg-light rounded-bottom`}>Device</div>
              </Tab>
            </Tabs>
        </section>
    </div>
  )
}

export default Settings
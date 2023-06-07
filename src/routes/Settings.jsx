import React from 'react'
import styles from './Settings.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SettingsDevice from '../components/SettingsDevice';
import SettingsProfile from '../components/SettingsProfile';

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
                <SettingsProfile/>
              </Tab>
              <Tab eventKey="device" title="Device">
                <SettingsDevice/>
              </Tab>
            </Tabs>
        </section>
    </div>
  )
}

export default Settings
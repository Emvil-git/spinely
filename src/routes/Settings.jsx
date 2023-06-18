import React from 'react'
import styles from './Settings.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SettingsDevice from '../components/SettingsDevice';
import SettingsProfile from '../components/SettingsProfile';
import Profile from '../components/Profile';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Settings() {
  const {user} = useAppContext();
  const navigate = useNavigate();

  useEffect(()=>{
      if(!user){
          navigate('/login');
      }
  },[user])

  return (
    <div className={`${styles.main} page`}>
        <div className={`${styles.top} rounded`}>
            <Profile/>
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
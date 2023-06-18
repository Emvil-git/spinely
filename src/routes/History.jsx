import React from 'react'
import styles from './History.module.css';
import Profile from '../components/Profile';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

function History() {
  const {user} = useAppContext();
  const navigate = useNavigate();

  useEffect(()=>{
      if(!user){
          navigate('/login');
      }
  },[user])

  return (
    <div className={`${styles.main} page`}>
      <div className={`${styles.top} bg-light rounded`}>
        <Profile/>
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
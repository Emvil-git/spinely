import React, { useState } from 'react'
import styles from './Profile.module.css';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

function Profile() {
  const {user, name, setName} = useAppContext();

  useEffect(() => {
    if(user){
      fetch(`http://localhost:4000/users/name`, {
      headers: {
        Authorization: `Bearer ${user.access}`
      }
    }).then(res => res.json())
    .then(data => {
      setName(data.name)
    })
    }
  }, [user])

  return (
    <div className={styles.profile}>
        <div className={styles.img}></div>
        {user && <span>{name}</span>}
    </div>
  )
}

export default Profile
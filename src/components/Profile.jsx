import React, { useState } from 'react'
import styles from './Profile.module.css';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

function Profile() {
  const {user} = useAppContext();
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/users/name`, {
      headers: {
        Authorization: `Bearer ${user.access}`
      }
    }).then(res => res.json())
    .then(data => {
      setName(data.name)
    })
  }, [])

  return (
    <div className={styles.profile}>
        <div className={styles.img}></div>
        {user && <span>{name}</span>}
    </div>
  )
}

export default Profile
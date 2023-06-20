import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import styles from './SettingsProfile.module.css';

function SettingsProfile() {
  return (
    <div className='settings rounded'>
        <section className={`${styles.cont} rounded`}>
            <p>Enter corresponding details to update your profile</p>
            <Form className='text-center'>
                <Form.Control className={`${styles.input}`} type="text" placeholder="New name" />
                <Form.Control className={`${styles.input}`} type="text" placeholder="New username" />
                <Form.Control className={`${styles.input}`} type="email" placeholder="New email" />
                <Form.Control className={`${styles.input}`} type="password" placeholder="New password" />
              <Button className={styles.button} type="submit">
                Update Profile
              </Button>
            </Form>
        </section>
    </div>
  )
}

export default SettingsProfile
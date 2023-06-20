import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './SettingsProfile.module.css';
import { useAppContext } from '../context/AppContext';
import Swal from 'sweetalert2';

function SettingsProfile() {
  const {user, setUser} = useAppContext();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/users/getInfo`, {
      headers: {
        Authorization: `Bearer ${user.access}`
      }
    }).then(res => res.json())
    .then(data => {
      const userData = data.results[0];
      setName(userData.name);
      setUsername(userData.username);
      setEmail(userData.email);
    })
  }, [])

  const updateUserInfo = (ev) => {
    ev.preventDefault();

    fetch(`http://localhost:4000/users/updateInfo`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.access}`
    },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
      })
    }).then(res => {

    fetch(`http://localhost:4000/users/refreshToken`, {
      headers: {
        Authorization: `Bearer ${user.access}`
      }
    }).then(
      res => res.json()
    ).then(
      data => {
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data);

        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Info Updated"
        })
      }
    )
    }).catch(
      error => {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Updating Info"
      })
      }
    )
  }

  return (
    <div className='settings rounded'>
        <section className={`${styles.cont} rounded`}>
            <p>Enter corresponding details to update your profile</p>
            <Form onSubmit={updateUserInfo} className='text-center'>
                <Form.Control className={`${styles.input}`} type="text" value={name} onChange={(ev) => {setName(ev.target.value)}}placeholder="New name" required/>
                <Form.Control className={`${styles.input}`} type="text" value={username}  onChange={(ev) => {setUsername(ev.target.value)}} placeholder="New username" required/>
                <Form.Control className={`${styles.input}`} type="email" value={email}  onChange={(ev) => {setEmail(ev.target.value)}} placeholder="New email" required/>
              <Button className={styles.button} type="submit">
                Update Profile
              </Button>
            </Form>
        </section>
    </div>
  )
}

export default SettingsProfile
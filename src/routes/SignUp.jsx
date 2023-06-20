import React from 'react';
import styles from './SignUp.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function SignUp() {

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signName, setSignName] = useState('');
  const [signUsername, setSignUsername] = useState('');
  const [signEmail, setSignEmail] = useState('');
  const [signPassword, setSignPassword] = useState('');
  const {setUser} = useAppContext();
  const navigate = useNavigate();

  const signUp = (ev) => {
    ev.preventDefault()

    fetch(`http://localhost:4000/users/checkUsername`, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        username: signUsername
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data)

      if(data.usernameExists === false){
        fetch(`http://localhost:4000/users/signUp`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          name: signName,
          username: signUsername,
          email: signEmail,
          password: signPassword,
        })
        }).then(result => result.json())
        .then(nextdata => {
        console.log(nextdata);    

        if (nextdata) {
          Swal.fire({
              title: "Sign Up Successful",
              icon: "success",
              text: "Log In to Access your Account"
            })
        } else {
          Swal.fire({
            title: "Registration failed",
            icon: "error",
            text: "Check your sign up details"
          })
        }
      })
      } else {
        Swal.fire({
          title: "Username Taken",
          icon: "error",
          text: "That username is already in use"
        })
      }
    })
  }

  const logIn = (ev) => {
    ev.preventDefault();

    fetch(`http://localhost:4000/users/logIn`, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      })
    }).then(res => res.json())
    .then(
      data => {
        console.log(data);

        if (data.access !== undefined) {
          Swal.fire({
            title: "Log In Successful",
            icon: "success",
            text: "Welcome!"
          })

          localStorage.setItem('user', JSON.stringify(data))
          setUser(data);
          navigate('/')
        } else {
          Swal.fire({
          title: "Log In Falied",
          icon: "error",
          text: "The username or password you entered is incorrect"
          })
        }
      }
    )
  }

  return (
    <div className={`${styles.main}`}>
      <div>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className={`${styles.tabs} nav-fill`}>
        <Tab eventKey="signup" title="Sign Up" className={`${styles.tab}`}>
          <section className={`${styles.formcont} rounded-bottom`}>
            <Form onSubmit={signUp} className='text-center'>
                <Form.Control className={`${styles.input}`} onChange={(ev) => {setSignName(ev.target.value)}} required value={signName} type="text" placeholder="New name" />
                <Form.Control className={`${styles.input}`} onChange={(ev) => {setSignUsername(ev.target.value)}} required value={signUsername} type="text" placeholder="New username" />
                <Form.Control className={`${styles.input}`} onChange={(ev) => {setSignEmail(ev.target.value)}} required value={signEmail} type="email" placeholder="New email" />
                <Form.Control className={`${styles.input}`} onChange={(ev) => {setSignPassword(ev.target.value)}} required value={signPassword} type="password" placeholder="New password" />
              <Button className={styles.button} variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
          </section>
        </Tab>
        <Tab eventKey="profile" title="Sign In" className={`${styles.tab}`}>
          <section className={`${styles.formcont} rounded-bottom`}>
            <Form onSubmit={logIn} className='text-center'>
                <Form.Control className={`${styles.input}`} onChange={(ev) => {setLoginUsername(ev.target.value)}} required value={loginUsername} type="text" placeholder="Username" />
                <Form.Control className={`${styles.input}`} onChange={(ev) => {setLoginPassword(ev.target.value)}} required value={loginPassword} type="password" placeholder="Passsword" />
              <Button className={styles.button} variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
          </section>
        </Tab>
      </Tabs>
      </div>
    </div>
  )
}

export default SignUp
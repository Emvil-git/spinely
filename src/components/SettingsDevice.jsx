import React, { useState } from 'react'
import styles from './SettingsDevice.module.css';
import { useAppContext } from '../context/AppContext';
import { convertDate } from '../_methods';
import Swal from 'sweetalert2';

function SettingsDevice() {
  const [calibData, setCalibData] = useState();

  const {calibration, setCalibration} = useAppContext();

  const saveCalibration = (ev) => {
    ev.preventDefault();

    if (calibData) {
      const date = new Date();

      if (calibration) {
        fetch(`http://localhost:4000/calibration/updateData`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
        },
        body: JSON.stringify({
          cervical_min_angle: calibData.cervical_min_angle,
          cervical_max_angle: calibData.cervical_max_angle,
          cervical_avg_angle: calibData.cervical_avg_angle,
          thoracic_min_angle: calibData.thoracic_min_angle,
          thoracic_max_angle: calibData.thoracic_max_angle,
          thoracic_avg_angle: calibData.thoracic_avg_angle,
          lumbar_min_angle: calibData.lumbar_min_angle,
          lumbar_max_angle: calibData.lumbar_max_angle,
          lumbar_avg_angle: calibData.lumbar_avg_angle,
          left_midAxLine_min_angle: calibData.left_midAxLine_min_angle,
          left_midAxLine_max_angle: calibData.left_midAxLine_max_angle,
          left_midAxLine_avg_angle: calibData.left_midAxLine_avg_angle,
          right_midAxLine_min_angle: calibData.right_midAxLine_min_angle,
          right_midAxLine_max_angle: calibData.right_midAxLine_max_angle,
          right_midAxLine_avg_angle: calibData.right_midAxLine_avg_angle,
          calibration_timestamp: convertDate(date)
        })
      }).then(res => {
        fetch(`http://localhost:4000/calibration/getData`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
            }
        }).then(res => res.json())
        .then(data => {
            Swal.fire({
              title: "Success",
              icon: "success",
              text: "Calibration Data Saved"
            })
            localStorage.setItem('calibration', JSON.stringify(data.result[0]))
            setCalibration(data.result[0]);
            console.log(calibration);
        })
      }).catch(error => {
        console.log(error)
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to save Calibration Data"
        })
      })
      } else {
        fetch(`http://localhost:4000/calibration/createData`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
          },
          body: JSON.stringify({
            cervical_min_angle: calibData.cervical_min_angle,
            cervical_max_angle: calibData.cervical_max_angle,
            cervical_avg_angle: calibData.cervical_avg_angle,
            thoracic_min_angle: calibData.thoracic_min_angle,
            thoracic_max_angle: calibData.thoracic_max_angle,
            thoracic_avg_angle: calibData.thoracic_avg_angle,
            lumbar_min_angle: calibData.lumbar_min_angle,
            lumbar_max_angle: calibData.lumbar_max_angle,
            lumbar_avg_angle: calibData.lumbar_avg_angle,
            left_midAxLine_min_angle: calibData.left_midAxLine_min_angle,
            left_midAxLine_max_angle: calibData.left_midAxLine_max_angle,
            left_midAxLine_avg_angle: calibData.left_midAxLine_avg_angle,
            right_midAxLine_min_angle: calibData.right_midAxLine_min_angle,
            right_midAxLine_max_angle: calibData.right_midAxLine_max_angle,
            right_midAxLine_avg_angle: calibData.right_midAxLine_avg_angle,
            calibration_timestamp: convertDate(date)
          })
        }).then(res => {
        fetch(`http://localhost:4000/calibration/getData`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
            }
        }).then(res => res.json())
        .then(data => {
            Swal.fire({
              title: "Success",
              icon: "success",
              text: "Calibration Data Saved"
            })
            localStorage.setItem('calibration', JSON.stringify(data.result[0]))
            setCalibration(data.result[0]);
            console.log(calibration);
        })
      }).catch(error => {
        console.log(error)
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to save Calibration Data"
        })
      })
      }
    } else {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "No Calibration Data Found!"
      })
    }
  }

  // Define a separate function to construct the email body

  // Modify openSupportEmail to accept calibration data as a parameter
  function openSupportEmail() {
    // Get the current date
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${month}${day}${year}`;

    // Construct the subject
    const subject = encodeURIComponent(`Support Ticket No: ${calibration.userId}-${formattedDate}`);

    // Construct the body with calibration data
    const body = `Hello, Spinely\n\nThe device may be facing issues with the readings:\n\nCalibrated Posture:\n- Cervical: ${calibration.cervical_min_angle}° - ${calibration.cervical_max_angle}°\n- Thoracic: ${calibration.thoracic_min_angle}° - ${calibration.thoracic_max_angle}°\n- Lumbar: ${calibration.lumbar_min_angle}° - ${calibration.lumbar_max_angle}°\n- Left side: ${calibration.left_midAxLine_min_angle}° - ${calibration.left_midAxLine_max_angle}°\n- Right side: ${calibration.right_midAxLine_min_angle}° - ${calibration.right_midAxLine_min_angle}°\n\n`;


    // Encode the body for the mailto link
    const encodedBody = encodeURIComponent(body);

    // Construct the mailto link
    const mailtoLink = `mailto:spinely@dlsud.edu.ph?subject=${subject}&body=${encodedBody}`;

    // Open the default email client with the mailto link
    window.location.href = mailtoLink;
  }

  return (
    <div className={`settings rounded`}>
      <div className={`${styles.cont} h-100 rounded`}>
        <p className='w-60 px-5 text-center'>Calibration records the acceptable bend ranges of your desired posture.</p>
        <section className={`${styles.angles}`}>
          <section className={`${styles.angleleft}`}>
            <input className={`${styles.angle} rounded bg-light`} readOnly placeholder='Cervial angle (Upper spine)' value={calibration && `Cervical: ${calibration.cervical_min_angle}° - ${calibration.cervical_max_angle}°`}/>
            <input className={`${styles.angle} rounded bg-light`} readOnly placeholder='Thoracic angle (Middle spine)' value={calibration && `Thoracic: ${calibration.thoracic_min_angle}° - ${calibration.thoracic_max_angle}°`}/>
            <input className={`${styles.angle} rounded bg-light`} readOnly placeholder='Lumbar angle (Lower spine)' value={calibration && `Lumbar: ${calibration.lumbar_min_angle}° - ${calibration.lumbar_max_angle}°`}/>
          </section>
          <section className={`${styles.angleright}`}>
            <input className={`${styles.angle} rounded bg-light`} readOnly placeholder='Left side angle' value={calibration && `Left side: ${calibration.left_midAxLine_min_angle}° - ${calibration.left_midAxLine_max_angle}°`}/>
            <input className={`${styles.angle} rounded bg-light`} readOnly placeholder='Right side angle' value={calibration && `Right side: ${calibration.right_midAxLine_min_angle}° - ${calibration.right_midAxLine_max_angle}°`}/>
          </section>
        </section>
        <p className='w-50 px-5 text-center'>Encountering issues with device readings? Contact <a href="#" onClick={openSupportEmail} style={{ textDecoration: 'none' }}>Support</a>.</p>
        <section className={`d-flex justify-content-around w-50`}>
          <button className={`${styles.button} rounded text-light`}>Calibrate</button>
          {/* <button onClick={saveCalibration} className={`${styles.button} ${styles.btn_outline} rounded border-dark text-dark`}>Save Calibration</button> */}
        </section>
      </div>
    </div>
  )
  
}

export default SettingsDevice
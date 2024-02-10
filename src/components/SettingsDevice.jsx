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
          cervical_angle_min: calibData.cervical_angle_min,
          cervical_angle_max: calibData.cervical_angle_max,
          cervical_angle_avg: calibData.cervical_angle_avg,
          thoracic_angle_min: calibData.thoracic_angle_min,
          thoracic_angle_max: calibData.thoracic_angle_max,
          thoracic_angle_avg: calibData.thoracic_angle_avg,
          lumbar_angle_min: calibData.lumbar_angle_min,
          lumbar_angle_max: calibData.lumbar_angle_max,
          lumbar_angle_avg: calibData.lumbar_angle_avg,
          left_midAxLine_angle_min: calibData.left_midAxLine_angle_min,
          left_midAxLine_angle_max: calibData.left_midAxLine_angle_max,
          left_midAxLine_angle_avg: calibData.left_midAxLine_angle_avg,
          right_midAxLine_angle_min: calibData.right_midAxLine_angle_min,
          right_midAxLine_angle_max: calibData.right_midAxLine_angle_max,
          right_midAxLine_angle_avg: calibData.right_midAxLine_angle_avg,
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
            cervical_angle_min: calibData.cervical_angle_min,
            cervical_angle_max: calibData.cervical_angle_max,
            cervical_angle_avg: calibData.cervical_angle_avg,
            thoracic_angle_min: calibData.thoracic_angle_min,
            thoracic_angle_max: calibData.thoracic_angle_max,
            thoracic_angle_avg: calibData.thoracic_angle_avg,
            lumbar_angle_min: calibData.lumbar_angle_min,
            lumbar_angle_max: calibData.lumbar_angle_max,
            lumbar_angle_avg: calibData.lumbar_angle_avg,
            left_midAxLine_angle_min: calibData.left_midAxLine_angle_min,
            left_midAxLine_angle_max: calibData.left_midAxLine_angle_max,
            left_midAxLine_angle_avg: calibData.left_midAxLine_angle_avg,
            right_midAxLine_angle_min: calibData.right_midAxLine_angle_min,
            right_midAxLine_angle_max: calibData.right_midAxLine_angle_max,
            right_midAxLine_angle_avg: calibData.right_midAxLine_angle_avg,
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

  return (
    <div className={`settings rounded`}>
      <div className={`${styles.cont} h-100 rounded`}>
        <p className='w-50 px-5 text-center'>Sit upright or stand with your back on a flat surface and hold position before pressing the calibrate button</p>
        <section className={`${styles.angles}`}>
          <section className={`${styles.angleleft}`}>
            <input className={`${styles.angle} rounded bg-light`} readOnly placeholder='Cervix angle (Upper spine)' value={calibration && calibration.cervical_angle_avg}/>
            <input className={`${styles.angle} rounded bg-light`} readOnly placeholder='Thoracic angle (Middle spine)' value={calibration && calibration.thoracic_angle_avg}/>
            <input className={`${styles.angle} rounded bg-light`} readOnly placeholder='Lumbar angle (Lower spine)' value={calibration && calibration.lumbar_angle_avg}/>
          </section>
          <section className={`${styles.angleright}`}>
            <input className={`${styles.angle} rounded bg-light`} readOnly placeholder='Left rib angle' value={calibration && calibration.left_midAxLine_angle_avg}/>
            <input className={`${styles.angle} rounded bg-light`} readOnly placeholder='Right rib angle' value={calibration && calibration.right_midAxLine_angle_avg}/>
          </section>
        </section>
        <section className={`d-flex justify-content-around w-50`}>
          <button className={`${styles.button} rounded text-light`}>Calibrate</button>
          {/* <button onClick={saveCalibration} className={`${styles.button} ${styles.btn_outline} rounded border-dark text-dark`}>Save Calibration</button> */}
        </section>
      </div>
    </div>
  )
}

export default SettingsDevice
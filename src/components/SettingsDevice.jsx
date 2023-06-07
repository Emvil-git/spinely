import React from 'react'

import styles from './SettingsDevice.module.css';

function SettingsDevice() {
  return (
    <div className={`bg-light settings rounded`}>
      <div className={`${styles.cont} bg-secondary h-100 rounded`}>
        <p className='w-50 px-5 text-center'>Sit upright or stand with your back on a flat surface and hold position before pressing the calibrate button</p>
        <section className={`${styles.angles}`}>
          <section className={`${styles.angleleft}`}>
            <div className={`${styles.angle} rounded bg-light`}>Cervix angle (Upper spine)</div>
            <div className={`${styles.angle} rounded bg-light`}>Thoracic angle (Middle spine)</div>
            <div className={`${styles.angle} rounded bg-light`}>Lumbar angle (Lower spine)</div>
            <div className={`${styles.angle} rounded bg-light`}>Left shoulder angle</div>
          </section>
          <section className={`${styles.angleright}`}>
            <div className={`${styles.angle} rounded bg-light`}>Right shoulder angle</div>
            <div className={`${styles.angle} rounded bg-light`}>Left rib angle</div>
            <div className={`${styles.angle} rounded bg-light`}>Right rib angle</div>
          </section>
        </section>
        <button className={`${styles.button} rounded bg-primary text-light`}>Save Calibration</button>
      </div>
    </div>
  )
}

export default SettingsDevice
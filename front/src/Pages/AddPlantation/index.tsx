import React from 'react'
import styles from './styles.module.css'

const index = () => {
  return (
    <div className="styles dashboardContainer">
      <div className={styles.title_container}>
        <h2>Nuevo Cultivo</h2>
      </div>
      
      <div className="fomr_container">
        <form action="">
          <div className={styles.input_group}>
            <input type="text" required/>
            <span className={styles.highlight}></span>
            <span className={styles.bar}></span>
            <label>Nombre</label>
          </div>
        </form>
      </div>
    </div>
  )
}

export default index
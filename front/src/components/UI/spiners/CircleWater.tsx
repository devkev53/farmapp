import styles from './circleWater.module.css'

export const CircleWater = () => {
  return (
    <div className={styles.circle}>
      <span className={styles.drop} ></span>
      <div className={styles.water}></div>
      <div className={styles.water2}></div>
    </div>
  )
}

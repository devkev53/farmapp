import { EditIcon } from '../../components/UI/icons/EditIcon';
import styles from './styles.module.css'

const index = () => {
  return (
    <div>
      <div className={styles.title_container}>
        <h2>User info</h2>
        <button className={styles.editIcon}>
          <EditIcon />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

export default index;
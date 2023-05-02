import { ModalContainer } from "../../../containers/ModalContainer";
import styles from './styles.module.css'

export const PageLoading = () => {
  return (
    <ModalContainer>
      <div className={styles.container}>
        <h3>Loading...</h3>
        <div className={styles.spinner}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </ModalContainer>
  );
}

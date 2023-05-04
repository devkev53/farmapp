import { ReactNode } from "react";
import { ModalContainer } from "../../containers/ModalContainer";
import { CamAddIcon } from "../UI/icons/CamAddIcon";
import styles from './styles.module.css'
export const ChangeImgModal = ({title, children}:{title:string, children:ReactNode}) => {

  const handlePressEnter = (e:any) => {
    e.keyCode === 13 && handleSubmitEdit(e)
  }
  
  return (
    <ModalContainer>
      <div onKeyDown={handlePressEnter} className={`${styles.edit_container} animate__animated animate__bounceIn`}>
        <div className={styles.edit_title}>
          <CamAddIcon />
          <h3>{title}</h3>
        </div>
        <div className={styles.edit_body}>
          {children}
        </div>
        <div className={styles.edit_options}>
          <button className={styles.edit_confirm} onClick={() => {}}>Si</button>
          <button className={styles.edit_cancel} onClick={close}>No</button>
        </div>
      </div>
    </ModalContainer>
  );
}

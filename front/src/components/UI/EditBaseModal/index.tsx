import { ReactNode } from "react"
import { ModalContainer } from "../../../containers/ModalContainer"
import { DeleteIcon } from "../icons/DeleteIcon"
import styles from './styles.module.css'
import { EditIcon } from "../icons/EditIcon"

export const EditBaseModal = (
  {id, title, children, close, updateFn}:
  {
    id:number, 
    title:string, 
    children:ReactNode, 
    close:() => void
    updateFn:(id:number, data:{}) => void

  }
) => {

  const handleSubmitEdit = (e:any) => {
    const form = document.querySelector('.edit_irrigation')
    const data = new FormData(form)
    const start = data.get('start_time')
    const end = data.get('end_time')
    if (start === '' || end === '') {
      return alert('Verifique los campos')
    }
    if (end <= start) {
      return alert('El inicio debe ser menor al final del riego')
    }
    updateFn(id, data)
  }
  const handlePressEnter = (e:any) => {
    e.keyCode === 13 && handleSubmitEdit(e)
  }

  return (
    <ModalContainer>
      <div onKeyDown={handlePressEnter} className={`${styles.edit_container} animate__animated animate__bounceIn`}>
        <div className={styles.edit_title}>
          <EditIcon />
          <h3>{title}</h3>
        </div>
        <div className={styles.edit_body}>
          {children}
        </div>
        <div className={styles.edit_options}>
          <button className={styles.edit_confirm} onClick={handleSubmitEdit}>Si</button>
          <button className={styles.edit_cancel} onClick={close}>No</button>
        </div>
      </div>
    </ModalContainer>
  )
}

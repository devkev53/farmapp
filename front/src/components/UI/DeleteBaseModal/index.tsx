import { ReactNode, useEffect, useState } from "react"
import { ModalContainer } from "../../../containers/ModalContainer"
import { DeleteIcon } from "../icons/DeleteIcon"
import styles from './styles.module.css'
import { getModalId } from "../../../services/modal-id.service"

export const DeleteBaseModal = (
  {id, title, children, close, deleteFn}:
  {
    id:number, 
    title:string, 
    children:ReactNode, 
    close:() => void, 
    deleteFn:(id:number) => void
  }
) => {

  
  // console.log("Id a elimiar desde el Modal: ", id)
  
  const handleDeleteConfirm = (e:any) => {
    deleteFn(id)
  }

  const handlePressEnter = (e:any) => {
    e.keyCode === 13 && handleDeleteConfirm(e)
  }

  return (
    <ModalContainer>
      <div onKeyDown={handlePressEnter} className={`${styles.delete_container} animate__animated animate__bounceIn`}>
        <div className={styles.delete_title}>
          <DeleteIcon />
          <h3>{title}</h3>
        </div>
        <div className={styles.delete_body}>
          {children}
        </div>
        <div className={styles.delete_options}>
          <button className={styles.delete_confirm} onKeyDown={handlePressEnter} onClick={handleDeleteConfirm}>Si</button>
          <button className={styles.delete_cancel} onClick={close}>No</button>
        </div>
      </div>
    </ModalContainer>
  )
}

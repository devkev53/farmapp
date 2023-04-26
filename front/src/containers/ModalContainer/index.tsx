import { createPortal } from "react-dom"
import styles from './styles.module.css'

export const ModalContainer = ({children}:{children:React.ReactNode}) => {
  const portal:HTMLElement = window.document.querySelector("#portal")
  
  return (
    createPortal(
      <div className={`${styles.modal_container} animate__animated animate__fadeIn`}>
        {children}
      </div>,
      portal
    )
  )
}

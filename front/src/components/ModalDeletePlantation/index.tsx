import React from 'react'
import { AlertIcon } from '../UI/icons/AlertIcon'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad'
import { deletePlantation } from '../../services/plantations.service'

export const ModalDeletePlantation = (
  {id, name, closeFn}:{
    id:number,
    name:string,
    closeFn:() => {}
  }) => {

    const {isLoading, callEndpoint} = useFetchAndLoad()

    const navigate = useNavigate()

    const handleDelete = async() => {
      const response = await callEndpoint(deletePlantation(id))
      console.log(response)

      navigate("/plantations")
    }

    const handleClose = () => {
      const container = document.querySelector('.animate__animated')
      container?.classList.remove('animate__bounceIn')
      container?.classList.add('animate__fadeOut')
      setTimeout(() => {
        closeFn()
      }, 1000);
    }

  return (
    <div className={`${styles.alertDelete} animate__animated animate__bounceIn `}>
      <div className={styles.title}>
        <AlertIcon />
        <h4>Eliminar el registro..!</h4>
      </div>
      <div className={styles.body}>
        <p>
          Esta seguro de eliminar el siguiente registro: <span>{name}</span>
        </p>
        <p>
          Sera una eliminacion logica, por lo que no se eliminara de la base de datos..! 
        </p>
      </div>
      <div className={styles.options}>
        <button className={styles.confirm_delete} onClick={handleDelete}>Si</button>
        <button className={styles.cancel_delete} onClick={handleClose}>No</button>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useParams } from 'react-router-dom'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad'
import { getIdPlantation } from '../../services/plantations.service'
import { PlantIcon } from '../../components/UI/icons/PlantIcon'
import { ClockIcon } from '../../components/UI/icons/ClockIcon'
import { InfoIcon } from '../../components/UI/icons/InfoIcon'
import { DropIcon } from '../../components/UI/icons/DropIcon'
import { CpuIcon } from '../../components/UI/icons/CpuIcon'
import { EditIcon } from '../../components/UI/icons/EditIcon'
import { DeleteIcon } from '../../components/UI/icons/DeleteIcon'
import { ModalContainer } from '../../containers/ModalContainer'
import { useModal } from '../../hooks/useModal'
import { ModalDeletePlantation } from '../../components/ModalDeletePlantation'

const index = () => {

  const [plantation, setPlantation] = useState()
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const {isVisible, showModal, closeModal} = useModal()
  
  const params = useParams()

  const getData = async () => await callEndpoint(getIdPlantation(params.id))
  
  useEffect(() => {
    const data = getData()
    data.then(data => setPlantation(data.data))
  },[])

  // console.log(plantation)



  return (
    <div className="styles dashboardContainer">
      <div className={styles.title_container}>
        <h2>{plantation?.name}</h2>
        <button onClick={showModal} className={styles.deleteIcon}>
          <DeleteIcon />
          <span>Delete</span>
        </button>
      </div>

      {/* EXTRA INFO */}
      <div className={styles.extra_info}>
        <div className="styles group">
          <p>Creado: <span>{plantation?.created}</span></p>
        </div>
        <div className="styles group">
          <p>Creado por: <span>{plantation?.created_by?.username}</span></p>
        </div>
        <div className="styles group">
          <p>Estado: <span>{plantation?.is_active === true ? ("Activo") : "Cosechado" }</span></p>
        </div>

        {/* BOTTON DE RIEGO MANUAL */}
        <div className="styles group">
          <button className={styles.irrigation_btn}>
            <span>
              <DropIcon />
              Activar Riego
            </span>
          </button>
        </div>
      </div>
      

      {/* CONTENIDO PRINCIPAL */}
      <div className={styles.main_content}>
          
        {/* DETALLES */}
        <div className={`${styles.details} ${styles.content_container}`}>
          <div className={styles.title}>
            <h3>Detalles</h3>
          </div>
          <div className={styles.content_info}>
            
            <div className={styles.row}>
              <PlantIcon />
              <div>
                <p>Cultivo</p>
                <span>{plantation?.name}</span>
              </div>
            </div>
            
            <div className={styles.row}>
              <InfoIcon />
              <div>
                <p>Descripción</p>
                <span>{plantation?.description}</span>
              </div>
            </div>
            
            <div className={styles.row}>
              <ClockIcon />
              <div>
                <p>Duración de Cosehca</p>
                <span>{plantation?.duration} dias aproximadamente</span>
              </div>
            </div>



          </div>
        </div>

        {/* RIEGO */}
        <div className={`${styles.content_container} ${styles.irrigation}`}>
          <div className={styles.title}>
            <h3>Riego</h3>
            {/* <h3><DropIcon/> Riego</h3> */}
          </div>
          <div className={`${styles.content_info} ${styles.info_irrigation}`}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, quisquam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, quisquam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, quisquam.</p>
          </div>
        </div>

        {/* TIERRA */}
        <div className={`${styles.ground} ${styles.content_container}`}>
          <div className={styles.title}>
            <h3>Terreno</h3>
            <button className={styles.edit_btn}>
              <EditIcon />
            </button>
          </div>
          <div className={`${styles.content_info}`}>

            <div className={styles.row}>
              <CpuIcon />
              <div>
                <p>ID THSCM:</p>
                <small>Identificador de Modulo Sensor y Control de Temperatura y Humedaed</small>
                <span>{plantation?.associated_ground?.thscm}</span>
              </div>
            </div>

            <div className={styles.row_one_line}>
              <div>
                <p>Perimetro:</p>
                <span>{plantation?.associated_ground?.perimeter}</span>
              </div>
            </div>

            <div className={styles.row_one_line}>
              <div>
                <p>Área:</p>
                <span>{plantation?.associated_ground?.area}</span>
              </div>
            </div>

            <div className={styles.row_one_line}>
              <div>
                <p>Capacidad:</p>
                <span>{plantation?.associated_ground?.ability}</span>
              </div>
            </div>

            <div className={styles.row_one_line}>
              <div>
                <p>Punto de Marchitamiento:</p>
                <span>{plantation?.associated_ground?.wilting_point} </span>
              </div>
            </div>

          </div>
        </div>        
        
        {isVisible && (
          <ModalContainer>
            <ModalDeletePlantation
              id={plantation?.id}
              name={plantation?.name}
              closeFn={closeModal}
            />
          </ModalContainer>
        )}

      </div>
    </div>
  )
}

export default index

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useParams, useNavigate } from 'react-router-dom'
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
import { PageLoading } from '../../components/UI/PageLoading'
import { EditGround } from '../../components/EditGround'
import { IrrigationDetails } from '../../containers/IrrigationDetails'
import { ModalTimeCountActive } from '../../components/ModalTimeCountActive'
import { getActivateManualIrrigation } from '../../services/irrigations.service'
import { plantationI } from '../../models/plantations.models'
import { PrinterIcon } from '../../components/UI/icons/PrinterIcon'
import { useGetPlantationReport } from '../../hooks/useGetPlantationReport'

const index = () => {

  const [plantation, setPlantation] = useState<plantationI>()
  const [edit, setEdit] = useState(false)
  const [editLoading, setEditLoading] = useState(false)

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const {isVisible, showModal, closeModal} = useModal()
  const {isVisible:onIrrVisible, showModal:onIrrShow, closeModal:onIrrClose} = useModal()
  const {isLoading:loadingReport, getReport} = useGetPlantationReport()
  
  const params = useParams()
  const navigate = useNavigate()

  const getData = async () => {
    try {
      let response
      params.id && (response = await callEndpoint(getIdPlantation(params.id)))
      setPlantation(response?.data)
    } catch (error) {
      navigate('/404')
    }
  }
  
  useEffect(() => {
    const data = getData()
  },[])

  const handleLoadingEdit = () => {
    setEditLoading(true)
    setTimeout(() => {
      setEditLoading(false)
      setEdit(!edit)
    }, 1000);
  }

  
  const daysToHarvest = () => {
    const today = Date.now()
    // console.log(today)
    plantation && plantation?.estimated_date_for_harvest
    // console.log(plantation?.estimated_date_harvest)
  }

  daysToHarvest()

  // console.log(plantation)

  return (
    <>
      {plantation && onIrrVisible && <ModalTimeCountActive plantatio_id={plantation.id} close={onIrrClose} />}
      {editLoading && <PageLoading />}
      {loadingReport && <PageLoading/>}
      {isLoading && <PageLoading />}
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
            <button
              onClick={onIrrShow}
              className={styles.irrigation_btn}>
              <span>
                <DropIcon />
                Activar Riego
              </span>
            </button>
          </div>
          
          <button className={styles.report_link} onClick={() => getReport(plantation?.id!)}>
            Ver Reporte
            <PrinterIcon />
          </button>

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
          <IrrigationDetails/>

          {/* TIERRA */}
          {plantation && edit 
            ? (
              <EditGround
                id={plantation?.id}
                area={plantation?.area}
                perimeter={plantation?.perimeter}
                ability={plantation?.ability}
                wilting_point={plantation?.wilting_point}
                thscm={plantation?.thscm}
                handleEdit={handleLoadingEdit}
              />
            )
            : (
              <div className={`${styles.ground} ${styles.content_container}`}>
                <div className={styles.title}>
                  <h3>Terreno</h3>
                  <button className={styles.edit_btn} onClick={handleLoadingEdit}>
                    <EditIcon />
                  </button>
                </div>
                
                <div className={`${styles.content_info}`}>

                  <div className={styles.row}>
                    <CpuIcon />
                    <div>
                      <p className={styles.thscm}>
                        ID THSCM:
                        <span className={styles.id_thscm}>{plantation?.thscm}</span>
                      </p>
                      <small>Identificador de Modulo Sensor y Control de Temperatura y Humedaed</small>
                    </div>
                  </div>

                  <div className={styles.row_one_line}>
                    <div>
                      <p>Perimetro:</p>
                      <span>{plantation?.perimeter} mts</span>
                    </div>
                  </div>

                  <div className={styles.row_one_line}>
                    <div>
                      <p>Área:</p>
                      <span>{plantation?.area} Mts</span>
                    </div>
                  </div>

                  <div className={styles.row_one_line}>
                    <div>
                      <p>Capacidad:</p>
                      <span>{plantation?.ability}%</span>
                    </div>
                  </div>

                  <div className={styles.row_one_line}>
                    <div>
                      <p>Punto de Marchitamiento:</p>
                      <span>{plantation?.wilting_point}%</span>
                    </div>
                  </div>

                </div>
                
              </div>    
            )
           }
          
          
          {plantation && isVisible && (
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
    </>
  )
}

export default index

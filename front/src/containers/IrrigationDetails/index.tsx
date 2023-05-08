import { useEffect, useRef, useState } from 'react';
import { AddIrrigartionModal } from '../../components/AddIrrigartionModal';
import { DeleteBaseModal } from '../../components/UI/DeleteBaseModal';
import { DeleteIcon } from '../../components/UI/icons/DeleteIcon';
import { DropIcon } from '../../components/UI/icons/DropIcon';
import { EditIcon } from '../../components/UI/icons/EditIcon';
import { WatchIcon } from '../../components/UI/icons/WatchIcon';
import { AddIcon } from '../../components/UI/icons/addIcon';
import { useModal } from '../../hooks/useModal';
import { ModalContainer } from '../ModalContainer';
import { EditBaseModal } from '../../components/UI/EditBaseModal';
import styles from './styles.module.css'
import { useParams } from 'react-router-dom';
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad';
import { addIrrigation, deleteIrrigation, updateIrrigation } from '../../services/irrigations.service';
import { getModalId } from '../../services/modal-id.service';
import { irrigationI } from '../../models/irrigation.models';
import { getIdPlantation } from '../../services/plantations.service';
import CircleSpinner from '../../components/UI/spiners/CircleSpinner';
import {EditIrrigation} from '../../components/EditIrrigation';


export const IrrigationDetails = () => {

  const [irrigationList, setIrrigationList] = useState<Array<irrigationI>>([])
  const [loadingChanges, setLoadingChanges] = useState(false)
  const [modalId, setModalId] = useState(0)
  
  const {isVisible:addIsVisible, showModal:addShow, closeModal:addClose} = useModal()
  const {isVisible:editIsVisible, showModal:editShow, closeModal:editClose} = useModal()
  const {isVisible:deleteIsVisible, showModal:deleteShow, closeModal:deleteClose} = useModal()

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const params = useParams()


  const getData = async () => await callEndpoint(getIdPlantation(params.id))
  
  useEffect(() => {
    const data = getData()
    data.then(data => {
      const irrigations:[] = data.data.irrigation
      const activeIrrigations = irrigations.filter(irr => irr.is_active === true)
      setIrrigationList(activeIrrigations)
    })
  },[loadingChanges])


  const submitAddIrrigation = async (data:any) => {
    setLoadingChanges(true)
    try {
      const response = await callEndpoint(addIrrigation(data))
      response.status === 201 && setLoadingChanges(false)
    } catch (error) {
      console.log(error)
      setLoadingChanges(false)
    }
    addClose()
  }

  const submitUpdateIrrigation = (id:number, data:any) => {
    setLoadingChanges(true)
    const response = callEndpoint(updateIrrigation(id, data))
    response.then(resp => {
      setLoadingChanges(false)
    })
    editClose()
  }

  const handleDeleteShow = (e:any) => {
    const irrigationId:number = e.target.id
    setModalId(irrigationId)
    deleteShow()
  }

  const handleEditShow = (e:any) => {
    const irrigationId:number = e.target.id
    setModalId(irrigationId)
    editShow()
  }

  const submitDeleteIrrigation = (id:number) => {
    setLoadingChanges(true)
    const response = callEndpoint(deleteIrrigation(id))
    response.then(resp => {
      console.log(resp)
      if (resp.status === 200) {
        deleteClose()
        setLoadingChanges(false)
      }
    })
  }

  const getIrrigation = (id) => {
    return irrigationList.find(irrigation => irrigation.id = id)
  } 


  return (
    <>
      {editIsVisible &&
        <EditBaseModal 
          id={modalId}
          updateFn={submitUpdateIrrigation}
          title='Editar Programación de Riego' 
          close={editClose}>
            <EditIrrigation id={modalId} data={getIrrigation} />
        </EditBaseModal> 
      }

      {deleteIsVisible && 
        <DeleteBaseModal 
          id={modalId}
          title='Eliminar Programacion de Riego'
          deleteFn={submitDeleteIrrigation} 
          close={deleteClose}>
            <p>Esta Seguro que desea Eliminar el riego</p>
        </DeleteBaseModal>
      }
      
      {addIsVisible && (
        <AddIrrigartionModal 
          close={addClose} 
          addFn={submitAddIrrigation}
        />
      )}
      <div className={`${styles.content_container} ${styles.irrigation}`}>
        <div className={styles.title}>
          <h3>Riego</h3>
          {/* <h3><DropIcon/> Riego</h3> */}
        </div>

        <div className={`${styles.content_info} ${styles.info_irrigation}`}>
          <div className={`${styles.irrigation_time}`}>
            <div className={`${styles.title_irrigation_time}`}>
              <div>
                <WatchIcon />
                <h3>Tiempos de Riego</h3>
              </div>
              <button className={styles.edit_btn} onClick={addShow}>
                <AddIcon />
              </button>
            </div>
            <div className={`${styles.content_irrigation_time}`}>
              {isLoading || loadingChanges 
                ?(
                  <CircleSpinner/>
                ) 
                :(
                  <ul>
                    {irrigationList <= 0 
                      ? (<div style={{width:"100%", display:"flex", justifyContent:"center"}}><h4>No se han registrado riegos</h4></div>) 
                      : irrigationList.map(irrigation => (
                        <li key={irrigation?.id} className="irrigation">
                          <div className={styles.element}>
                            <DropIcon /> 
                              <span className='start'>{irrigation?.start_time}</span> 
                              <i> - </i> 
                              <span className='end'>{irrigation?.end_time}</span>
                            
                            <div className={styles.options_btn}>
                              <button 
                                id={irrigation?.id} 
                                className={styles.btn_edit} 
                                onClick={handleEditShow}>
                                  <EditIcon/>
                                </button>
                              <button 
                                id={irrigation?.id} 
                                className={styles.btn_delete} 
                                onClick={handleDeleteShow}>
                                  <DeleteIcon/>
                                </button>
                            </div>
                          </div>
                        </li>
                        )
                      )
                    }
                  </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
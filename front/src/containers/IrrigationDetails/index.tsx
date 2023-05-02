import { AddIrrigartionModal } from '../../components/AddIrrigartionModal';
import { DeleteIcon } from '../../components/UI/icons/DeleteIcon';
import { DropIcon } from '../../components/UI/icons/DropIcon';
import { EditIcon } from '../../components/UI/icons/EditIcon';
import { WatchIcon } from '../../components/UI/icons/WatchIcon';
import { AddIcon } from '../../components/UI/icons/addIcon';
import { useModal } from '../../hooks/useModal';
import { ModalContainer } from '../ModalContainer';
import styles from './styles.module.css'

export const IrrigationDetails = ({irrigations}:{irrigations:[]}) => {
  
  const {isVisible:addIsVisible, showModal:addShow, closeModal:addClose} = useModal()
  const {isVisible:editIsVisible, showModal:editShow, closeModal:editClose} = useModal()
  const {isVisible:deleteIsVisible, showModal:deleteShow, closeModal:deleteClose} = useModal()


  return (
    <>
      {deleteIsVisible && 
        <ModalContainer>
          Borrar
        </ModalContainer>
      }
      {addIsVisible && (
        <AddIrrigartionModal close={addClose}/>
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
              <ul>
                {irrigations.map(irrigation => (
                  <li key={irrigation?.id} className="irrigation">
                    <div className={styles.element}>
                      <DropIcon /> <span>{irrigation?.start_time}</span> <i> - </i> <span>{irrigation?.end_time}</span>
                      
                      <div className={styles.options_btn}>
                        <button className={styles.btn_edit}><EditIcon/></button>
                        <button className={styles.btn_delete} onClick={deleteShow}><DeleteIcon/></button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
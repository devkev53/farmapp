import { PageLoading } from "../../components/UI/PageLoading";
import { EditIcon } from "../../components/UI/icons/EditIcon";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import styles from './styles.module.css'

const index = () => {

  const {isLoading, callEndpoint} = useFetchAndLoad()
 
  return (
    <>
      {isLoading && <PageLoading />}
      <div className={styles.dashboard_content}>

        <div className={styles.title_container}>
          <h2>Dashboard</h2>
          {/* <button onClick={()=>{}} className={styles.editIcon}>
            <EditIcon />
            <span>Editar</span>
          </button> */}
        </div>

        <div className={styles.cards_spaces}>
          <div className={styles.card}>
            <div className="styles name">
              Cebolla
            </div>
            <div className="styles card_content">
              <div className={styles.circular_progress}>
                <div className={styles.inside}></div>
                <div className={styles.outside}></div>
                <h3 className={styles.number}>15%</h3>
                <div className={styles.circle}>
                  <div className={styles.dot}>
                    <span></span>
                  </div>
                <div className={`${styles.bar} ${styles.left}`}>
                  <div className={styles.progress}></div>
                </div>
                <div className={`${styles.bar} ${styles.right}`}>
                  <div className={styles.progress}></div>
                </div>

                </div>

              </div>
              <div className="styles more_info">
                <div><span>Listos de Agua:</span></div>
                <div>
                  <span>Programacion de riego</span>
                  <div className="">
                    <ul>
                      <li><span>10:00</span> - <span>10:30</span></li>
                      <li><span>10:00</span> - <span>10:30</span></li>
                      <li><span>10:00</span> - <span>10:30</span></li>
                      <li><span>10:00</span> - <span>10:30</span></li>
                      <li><span>10:00</span> - <span>10:30</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
    
  );
}

export default index;
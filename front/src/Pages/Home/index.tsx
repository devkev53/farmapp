import { PageLoading } from "../../components/UI/PageLoading";
import { EditIcon } from "../../components/UI/icons/EditIcon";
import { PlantIcon } from "../../components/UI/icons/PlantIcon";
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


          <div className={styles.card_dash}>
            <picture>
              <PlantIcon />
            </picture>
            <div className={styles.title_name}>
              Cebolla
            </div>
            <div className={styles.card_content}>
              
              <div className={styles.cosecha}>
                <p>Creado: 04-05-2023</p>
                <div className={styles.skill}>
                  <div className={styles.outer}>
                    <div className={styles.inner}>
                      <div className={styles.number_porcent}>
                        70%
                      </div>
                    </div>
                  </div>

                  <svg xmlns="" version="1.1" width="120px" height="120px">
                    <defs>
                      <linearGradient id="GradientColor">
                        <stop offset="0%" stopColor="#e91e63" />
                        <stop offset="100%" stopColor="#673ab7" />
                      </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="52" strokeLinecap="round" />
                  </svg>

                </div>
              </div>

              <div className="styles more_info">
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
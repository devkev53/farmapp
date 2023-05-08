import { useEffect, useState } from "react";
import { PageLoading } from "../../components/UI/PageLoading";
import { EditIcon } from "../../components/UI/icons/EditIcon";
import { PlantIcon } from "../../components/UI/icons/PlantIcon";
import { DashboardCard } from "../../containers/DashboardCard";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import styles from './styles.module.css'
import { getPlantations } from "../../services/plantations.service";

const index = () => {

  const [plantations, setPlantatios] = useState([])
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const geLastPlantations = async() => {
    const response = await callEndpoint(getPlantations())
    console.log(response)
    setPlantatios(response.data.slice(0,2))
  }

  useEffect(()=>{
    geLastPlantations()
  },[])

  console.log(plantations)
 
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

          {plantations.length  > 0 ?
            plantations?.map(plant => (

              <DashboardCard 
                key={plant.id} 
                name={plant.name}
                created={plant?.created}
                days={plant?.estimated_days_for_harvest.days}
                porcent={plant?.estimated_days_for_harvest.porcent}
                irrigations={plant?.irrigation}
                water={plant?.used_water}  />
            ))
          : (<h2>No existen Registros</h2>)
          }

        </div>

      </div>
    </>
    
  );
}

export default index;
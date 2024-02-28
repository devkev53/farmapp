import { CircleWater } from "../../components/UI/spiners/CircleWater";
import { Link } from "react-router-dom";
import { ListPlantations } from "../../containers/ListPlantations";
import styles from './styles.module.css'
import { AddIcon } from "../../components/UI/icons/addIcon";

const index = () => {
  return (
    <div className="styles dashboardContainer">
      <div className={styles.title_container}>
        <h2>Mis Cultivos</h2>
        <Link to="/add-plantation" className={`${styles.add_link} action_btn`}>
          <AddIcon />
          <span>Nuevo</span>
        </Link>
      </div>
      <ListPlantations />
      {/* <CircleWater /> */}
    </div>
  );
}

export default index;
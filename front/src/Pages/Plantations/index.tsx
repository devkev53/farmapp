import { CircleWater } from "../../components/UI/spiners/CircleWater";
import { ListPlantations } from "../../containers/ListPlantations";

const index = () => {
  return (
    <div className="styles dashboardContainer">
      <h2>Mis Cultivos</h2>
      <ListPlantations />
      <CircleWater />
    </div>
  );
}

export default index;
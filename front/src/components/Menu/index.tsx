import { Link } from "react-router-dom";

import styles from  './styles.module.css'
import { useEffect, useState } from "react";
import { menuContract } from "../../services/menu-subject.service";

// Imports Icons Components
import { DashboardIcon } from "../UI/icons/DashboardIcon";
import { PlantIcon } from "../UI/icons/PlantIcon";
import { ReportsIcon } from "../UI/icons/ReportsIcon";
import OffIcon from "../UI/icons/OffIcon";
import { useAuthContext } from "../../hooks/useAuthContext";

const index = () => {
  const [isMenuExpand, setIsMenuExpand] = useState()
  const {handleLogout} = useAuthContext()

  
  useEffect(()=>{
    menuContract.getSubject().subscribe((value)=> {
      setIsMenuExpand(value)
    })
  }, [])
  return (
    <ul className={`${styles.menuList} ${isMenuExpand && styles.contract}`}>

      <li className={`${styles.menuItem} ${styles.activeItem}`}>
        <Link to="/dashboard">
          <i>
            <DashboardIcon />
          </i>
          <span>Dashboard</span>
        </Link>
      </li>

      <li className={styles.menuItem}>
        <Link to="/">
          <i>
            <PlantIcon/>
          </i>
          <span>Mis Cultivos</span>
        </Link>
      </li>

      <li className={styles.menuItem}>
        <Link to="/">
          <i>
            <ReportsIcon />
          </i>
          <span>Reportes</span>
        </Link>
      </li>

      <li className={`${styles.menuItem} ${styles.logoutBtn}`}>
        <button onClick={handleLogout}>
          <i>
            <OffIcon />
          </i>
          <span>Cerrar Sessión</span>
        </button>
      </li>
    </ul>
  );
}

export default index;
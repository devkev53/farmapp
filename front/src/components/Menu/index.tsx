import { Link, useLocation } from "react-router-dom";

import styles from  './styles.module.css'
import { useEffect, useState } from "react";
import { menuContract } from "../../services/menu-subject.service";
import MenuItem from '../MenuItem'

// Imports Icons Components
import OffIcon from "../UI/icons/OffIcon";


import { useAuthContext } from "../../hooks/useAuthContext";

const index = () => {
  const [isMenuExpand, setIsMenuExpand] = useState()
  const {handleLogout} = useAuthContext()
  
  const location = useLocation()

  
  useEffect(()=>{
    menuContract.getSubject().subscribe((value)=> {
      setIsMenuExpand(value)
    })
  }, [])

  return (
    <ul className={`${styles.menuList} ${isMenuExpand && styles.contract}`}>

      <MenuItem />
      {/* <li className={`${styles.menuItem} ${styles.activeItem}`}>
        <Link to="/dashboard">
          <i>
            <DashboardIcon />
          </i>
          <span>Dashboard</span>
        </Link>
      </li>

      <li className={styles.menuItem}>
        <Link to="/plantations">
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
      </li> */}

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
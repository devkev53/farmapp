import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuContract, menuSubject } from "../../services/menu-subject.service";


// Imports Icons Components
import { DashboardIcon } from "../UI/icons/DashboardIcon";
import { PlantIcon } from "../UI/icons/PlantIcon";
import { ReportsIcon } from "../UI/icons/ReportsIcon";

import { pathList } from "../../utilities/path-list.utility";
import styles from  './styles.module.css'
import { UserCirle } from "../UI/icons/UserCirleIcon";
import { UserCheckIcon } from "../UI/icons/UserCheckIcon";

const index = () => {
  const [isMenuExpand, setIsMenuExpand] = useState()
  const location = useLocation()

  const returnIcon = (path:string) => {
    if (path === '/') {
      return <DashboardIcon />
    } else if (path === '/plantations') {
      return <PlantIcon />
    } else if (path === '/reports') {
      return <ReportsIcon />
    } else if (path === '/profile') {
      return <UserCheckIcon />
    }
  }

  useEffect(()=>{
    menuContract.getSubject().subscribe((value)=> {
      setIsMenuExpand(value)
    })
  }, [])

  const handleclickMenuItem = () => {
    menuSubject.setSubject(false)
  }

  return (
    pathList.map(path => (
      <li 
        onClick={handleclickMenuItem}
        key={path.path} 
        className={`
          ${styles.menuItem}
          ${isMenuExpand && styles.contract}
          ${path.path === location.pathname && styles.activeItem}
        `}
      >
        <Link to={path.path}>
          <i className={`${path.path === '/profile' && styles.userIcon}`}>
            {returnIcon(path.path)}
          </i>
          <span>{path.name}</span>
        </Link>
      </li>
    ))
  );
}

export default index;
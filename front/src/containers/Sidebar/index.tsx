import Menu from '../../components/Menu'
import styles from './styles.module.css'
import logo from '../../assets/PGII.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { menuContract, menuSubject } from '../../services/menu-subject.service'
import { useAuthContext } from '../../hooks/useAuthContext'
import { UserStatesTypes } from '../../models'
import { baseURL } from '../../services/auth.service'

const index = () => {
  const [isMenuExpand, setIsMenuExpand] = useState(true)
  const [isShowMenu, setIsShowMenu] = useState<any>(false)
  const [userData, setUserData] = useState<UserStatesTypes>(null)
  const {user} = useAuthContext()

  useEffect(() => {
    menuSubject.getSubject().subscribe((value) => {
      setIsShowMenu(value)
    })
  },[])

  const handleContractMenu = () => {
    setIsMenuExpand(!isMenuExpand)
    menuContract.setSubject(isMenuExpand)
  }

  const handleCloseMenu = () => {
    setIsShowMenu(false)
    menuSubject.setSubject(false)
  }

  useEffect(() => {
    
  },[])

  return (
    <aside className={`${styles.sidebar} ${ isShowMenu && styles.showMenu} ${ !isMenuExpand && styles.contract}`}>
      <div className={styles.sidebarContainer}>
        <div className={styles.appInfo}>
          <Link to="/dashboard">
          <picture>
            <img src={logo} alt="logo" />
            <h2>SISRIEG</h2>
          </picture>
          </Link>
          <button onClick={handleContractMenu} className={styles.expandBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-left" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="4" y1="12" x2="14" y2="12" />
              <line x1="4" y1="12" x2="8" y2="16" />
              <line x1="4" y1="12" x2="8" y2="8" />
              <line x1="20" y1="4" x2="20" y2="20" />
            </svg>
          </button>

          <button onClick={handleCloseMenu} className={styles.closeMenuBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={styles.userInfo}>
          <picture>
            {user !== null && user?.image === null 
              ? <img src={user?.url_img} alt={user?.username} />
              : <img src={`${baseURL}${user?.url_img}`} alt={user?.username} />
            }
            {/* {user !== null && user?.image === null
              ? (<img src="https://robohash.org/pickles123" alt="avatar" />)
              : (<img src={user?.image} alt={user?.username} />)
            } */}
            <p>{user !== null && `${user?.name} ${user?.last_name}`}</p>
            <small>{user !== null && user?.username}</small>
          </picture>
        </div>
        <div className={styles.menuContainer}>
          <Menu />
        </div>
      </div>
    </aside>
  );
}

export default index;
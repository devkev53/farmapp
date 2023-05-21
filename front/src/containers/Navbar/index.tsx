import { Link } from 'react-router-dom';
import styles from './styles.module.css'
import Menu from '../../components/Menu'
import logo from '../../assets/PGII.svg'
import { useState } from 'react';
import { menuSubject } from '../../services/menu-subject.service';
import { useAuthContext } from '../../hooks/useAuthContext';
import 'animate.css';
import { baseURL } from '../../services/auth.service';

const index = () => {

  const [isShowUserOptions, setIsShowUserOptions] = useState(false)
  const {user} = useAuthContext()

  const handleClickOpenMenu = () => {
    menuSubject.setSubject(true)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Logo" />
        </Link>
        <button onClick={handleClickOpenMenu} className={styles.burguerBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <Link to="/profile" onClick={() => setIsShowUserOptions(!isShowUserOptions)} className={styles.userInfo}>
          <picture>
            {user !== null && user?.image === null 
              ? <img src={user?.url_img} alt={user?.username} />
              : <img src={`${baseURL}${user?.url_img}`} alt={user?.username} />
            }
          </picture>
          <p>{user !== null && user?.username}</p>
        </Link>
      </div>
      
    </nav>
  );
}

export default index;
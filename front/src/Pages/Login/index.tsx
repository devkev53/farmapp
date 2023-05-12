import styles from './styles.module.css'
import logo from '../../assets/PGII.svg'
import { Link } from 'react-router-dom';
import { FormEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad';
import { loginService } from '../../services/auth.service';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

// import Icons Compoent
import { UserCirle } from '../../components/UI/icons/UserCirleIcon';
import { Password } from '../../components/UI/icons/PasswordIcon';
import { EyeShow } from '../../components/UI/icons/EyeShowIcon';
import { EyeHide } from '../../components/UI/icons/EyeHideIcon';
import { Login } from '../../components/UI/icons/LoginIcon';

import CircleSpinner from '../../components/UI/spiners/CircleSpinner';
import { USER_STATES } from '../../utilities/user_states';
import { testingService } from '../../services/testing.service';

const index = () => {
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const [isPassHide, setIsPassHide] = useState(true)
  const {userInfo, setIsLogged, setLoginData, isLogged} = useAuthContext()
  const navigate = useNavigate()

  const formRef = useRef<HTMLFormElement>(null)

  // TESTING
  // const [morty, setMorty] = useState({} as any)
  // const fetchMorty = async() => {
  //   const {data} = await callEndpoint(testingService())
  //   console.log(data)
  // }

  // useEffect(()=>{
  //   fetchMorty()
  // },[])
  
  const handleSubmit:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    loginUser(data)
  }

  const loginUser = async(data) => {
    try {
      const result = await callEndpoint(loginService(data))
      setLoginData(result.data)
      setIsLogged(true)
      navigate("/")
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    userInfo !== USER_STATES.NOT_LOGGED && navigate('/')
  }, [userInfo])
  
  return (
    <div className={styles.login}>
      <div className={styles.container}></div>
      <div className={styles.loginContainer}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <img src={logo} alt="logo" />
          <h2>Bienvenido</h2>
          <div className={styles.input_group}>
            <label htmlFor="">
              <span>Usuario</span>
            </label>
            <input name='username' type="text" placeholder='admin' required autoComplete="false"/>
            <i>
              <UserCirle />
            </i>
          </div>
          <div className={styles.input_group}>
            <label htmlFor="">
              <span>Contraseña</span>
            </label>
            <input name='password' type={`${isPassHide ? "password" : "text"}`} placeholder='abc123' required autoComplete="false"/>
            <i>
              <Password />
            </i>
            <button type='button' onClick={() => setIsPassHide(!isPassHide)} className={styles.showPassBtn}>
              {isPassHide 
                ? (<EyeShow/>) :(<EyeHide/>)
              }
            </button>
          </div>
          <button className={styles.submitBtn} type="submit">
            {isLoading 
              ? <CircleSpinner/>
              : (<><Login /> Iniciar Sesión</>)
            }
          </button>
          <Link to='/'>
            <span>
              Recuperar Contraseña!
            </span>
          </Link>
          <a className={styles.create_user_btn} href='/create-user'>
            <span>
              Crear Usuario
            </span>
          </a>
        </form>
      </div>
    </div>
  );
}

export default index;
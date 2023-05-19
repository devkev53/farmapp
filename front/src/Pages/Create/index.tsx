import { Link, useNavigate } from 'react-router-dom';
import { AddUserIcon } from '../../components/UI/icons/AddUserIcon';
import styles from './styles.module.css'
import { ArrowBack } from '../../components/UI/icons/ArrowBack';
import { ArrowDown } from '../../components/UI/icons/Arrow-down';
import { ArrowDownIcon } from '../../components/UI/icons/ArrowDownIcon';
import { useRef, useState } from 'react';
import { EyeShow } from '../../components/UI/icons/EyeShowIcon';
import { EyeHide } from '../../components/UI/icons/EyeHideIcon';
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad';
import { addUser } from '../../services/users.service';
import { SnackbarUtilities } from '../../utilities/snackbar-manager';
import { PageLoading } from '../../components/UI/PageLoading';


const index = () =>{

  const [showProfileInputs, setShowProfileInputs] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [passOk, setPassOk] = useState(false)
  const [loading, setLoading] = useState(false)

  const formRef = useRef(null)
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const navigate = useNavigate()

  const handleShowProfileInputs = () => {
    setShowProfileInputs(!showProfileInputs)
  }
  
  const changePass = (e:any) => {
    setPassword(e.target.value)
  }

  const changeEmail = (e:any) => {
    setEmail(e.target.value)
  }
  const checkValueEmail = (e:any) => {
    if (!e.target.checkValidity()) {
      alert("Ingresa un correo valido")
      setEmail('')
    }
  }
  const changePass2 = (e:any) => {
    setPassword2(e.target.value)
    if (e.target.value !== password) {
      e.target.classList.add('error')
      setPassOk(false)
    } else {
      e.target.classList.remove('error')
    }
    setTimeout(() => {
      setPassOk(true)
    }, 500);
  }

  const showPass = () => {
    setShowPass1(!showPass1)
  }
  const showConfirmPass = () => {
    setShowPass2(!showPass2)
  }


  const handleSubmit = () => {
    setLoading(true)
    const form:HTMLFormElement = formRef.current!
    const data = new FormData(form)
    const response = callEndpoint(addUser(data))
    response.then(resp => {
      setTimeout(() => {
        setLoading(false)
        navigate('/login')
      }, 2000);
      SnackbarUtilities.success("Usuario creado correctamente..!")
    })
  }

  return (
    <>
      {loading && <PageLoading/>}
      <div className={styles.create_user_container}>
        <div className={styles.title}>
          <h3> <AddUserIcon/> Creacion de Usuario</h3>
          <Link to="/login">
            <ArrowBack />
          </Link>
        </div>

        <form ref={formRef} className={`${styles.form_container}`} action="">

          <div className={`${styles.container_info} userInfo`}>
            
            <div className="section_title">
              <h4>Información de Usuario</h4>
            </div>
          
            <div className="input_group">
              <div className="">
                <input className='' name='username' type="text" required/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Usuario</label>
              </div>
              <span className="helptext"></span>
            </div>

            <div className="input_group">
              <div className="">
                <input className='' name='email' type="email" onBlur={checkValueEmail} onChange={changeEmail} value={email} required/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Correo</label>
              </div>
              <span className="helptext"></span>
            </div>

            <div className="input_group">
              <div className="">
                <input name='password' type={`${ showPass1 ? 'text' : 'password'}`} onChange={changePass} value={password} required/>
                {password.length > 0 &&
                  <i onClick={showPass} className={styles.showPass} onFocus={(e) => {e.target.blur()}}>
                    {showPass1 
                      ? <EyeHide/>
                      : <EyeShow/>
                    }
                  </i>
                }
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Contraseña</label>
              </div>
              <span className="helptext"></span>
            </div>

            <div className="input_group">
              <div className="">
                <input name='password2' type={`${ showPass2 ? 'text' : 'password'}`} onChange={changePass2} value={password2} required/>
                {password2.length > 0 &&
                  <i onClick={showConfirmPass} className={styles.showPass} onFocus={(e) => {e.target.blur()}}>
                    {showPass2 
                      ? <EyeHide/>
                      : <EyeShow/>
                    }
                  </i>
                }
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Confirmar Contraseña</label>
              </div>
              <span className="helptext"></span>
            </div>
          
          </div>

          <div className={`${styles.container_info} ${styles.profileInfo}`}>
            
            <div className={styles.section_title}>
              <h4>Información de Perfil</h4>
              <i onClick={handleShowProfileInputs} className={`${styles.showBtn} ${showProfileInputs && styles.showInputs}`}>
                <ArrowDownIcon/>
              </i>
            </div>

            <div className={`${styles.inputs_container} ${showProfileInputs && styles.showInputs}`}>
            
              <div className="input_group">
                <div className="">
                  <input className='' name='name' type="text"/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Nombres</label>
                </div>
                <span className="helptext"></span>
              </div>

              <div className="input_group">
                <div className="">
                  <input className='' name='last_name' type="text"/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Apellidos</label>
                </div>
                <span className="helptext"></span>
              </div>

              <div className="input_group">
                <div className="">
                  <input className='' name='phone' type="text"/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Teléfono</label>
                </div>
                <span className="helptext"></span>
              </div>

              <div className="input_group">
                <div className="">
                  <input className='' name='address' type="text"/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Dirección</label>
                </div>
                <span className="helptext"></span>
              </div>

              <div className="input_group">
                <div className="">
                  <input className='' name='birthday' type="date"/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Fecha de Nacimiento</label>
                </div>
                <span className="helptext"></span>
              </div>

            </div>
          
          </div>

        
        </form>
        <button disabled={!passOk} onClick={handleSubmit} type='submit'><AddUserIcon/> Crear Usuario</button>
      </div>
    </>
  )
}

export default index;
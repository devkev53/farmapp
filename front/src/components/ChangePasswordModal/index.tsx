import { useRef, useState } from "react"
import { ModalContainer } from "../../containers/ModalContainer"
import { KeyIcon } from "../UI/icons/keyIcon"
import styles from './styles.module.css'
import { EyeHide } from "../UI/icons/EyeHideIcon"
import { EyeShow } from "../UI/icons/EyeShowIcon"
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad"
import { changePassword } from "../../services/users.service"

export const ChangePasswordModal = (
  {id, title, close}:{
    id: number
    title:string,
    close:()=>void
  }
) => {

  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [passOk, setPassOk] = useState(false)

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const formRef = useRef<HTMLFormElement>(null)

  const setChangePassword = async(id:number, data:{}) => callEndpoint(changePassword(id, data))

  const onChangePass1 = (e:any) => {
    setPassword(e.target.value)
  }
  const onChangePass2 = (e:any) => {
    setPassword2(e.target.value)
  }
  const showPass = () => {
    setShowPass1(!showPass1)
  }
  const showConfirmPass = () => {
    setShowPass2(!showPass2)
  }

  const handlePressEnter = (e:any) => {
    e.keyCode === 13 && handleSubmitPass(e)
  }

  const handleSubmitPass = async (e:any) => {
    const data = new FormData(formRef.current!)
    const response = await setChangePassword(id, data)
    close()
  }

  return (
    <ModalContainer>
      <div onKeyDown={handlePressEnter} className={`${styles.edit_container} animate__animated animate__bounceIn`}>
        <div className={styles.edit_title}>
          <KeyIcon />
          <h3>{title}</h3>
        </div>

        <div className={styles.edit_body}>
          
          <form className={styles.form_container} ref={formRef} action="">

            <div className="">
              <div className="input_group">
                <div className="">
                  <input name="password" type={`${ showPass1 ? 'text' : 'password'}`} required value={password} onChange={onChangePass1} />
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
              </div>
              <span className="helptext"></span>
            </div>

            <div className="">
              <div className="input_group">
                <div className="">
                  <input name="password2" type={`${ showPass2 ? 'text' : 'password'}`} required value={password2} onChange={onChangePass2} />
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
                  <label>Contraseña</label>
                </div>
              </div>
              <span className="helptext"></span>
            </div>

          </form>

          {/* <form action="">
            
            <div className="input_group">
              <div className="">
                <input name='password' type={`${ showPass1 ? 'text' : 'password'}`} required/>
                {password.length > 0 &&
                  <i onClick={showPass} className={styles.showPass} onFocus={(e) => {e.target.blur()}} type='button'>
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
                <input name='password2' type={`${ showPass2 ? 'text' : 'password'}`} required/>
                {password2.length > 0 &&
                  <i onClick={showConfirmPass} className={styles.showPass} onFocus={(e) => {e.target.blur()}} type='button'>
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

          </form> */}
        </div>
        
        <div className={styles.edit_options}>
            <button className={styles.edit_confirm} onClick={handleSubmitPass}>Si</button>
            <button className={styles.edit_cancel} onClick={close}>No</button>
          </div>
      </div>

    </ModalContainer>
  )
}

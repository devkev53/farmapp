import { useEffect, useRef, useState } from "react"
import { ModalContainer } from "../../containers/ModalContainer"
import { EditIcon } from "../UI/icons/EditIcon"
import styles from './styles.module.css'
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad"
import { updateUser } from "../../services/users.service"
import { useAuthContext } from "../../hooks/useAuthContext"
import { updateChangeUserProfileLocalStorage } from "../../utilities/localStorage_user.utility"
import { PageLoading } from "../UI/PageLoading"
import { SnackbarUtilities } from "../../utilities/snackbar-manager"

export const EditUserModal = ({data, close}:{data:any, close:()=>void}) => {

  const [userData, setUserData] = useState(data)
  const [name, setName] = useState(data?.name)
  const [lastName, setLastName] = useState(data?.last_name)
  const [phone, setPhone] = useState(data?.phone)
  const [address, setAddress] = useState(data?.address)
  const [birthday, setBirthday] = useState(data?.birthday)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    console.log(data?.birthday)
    const date = new Date(data?.birthday)
    setBirthday(date)
    console.log(date.toLocaleString())
  },[])

  const formRef = useRef<HTMLFormElement>(null)
  const {callEndpoint} = useFetchAndLoad()
  const {setLoginData} = useAuthContext()

  const updateData = async(dataForm:any) => {
    setLoading(true)
    try {
      const response = await callEndpoint(updateUser(data?.id, dataForm))
      if(response.status === 200) {
        const data = updateChangeUserProfileLocalStorage(response.data)
        setLoginData(data)
        setTimeout(() => {
          setLoading(false)
          close()
        }, 2000);
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleSubmitEdit = () => {
    const dataForm = new FormData(formRef.current!)
    dataForm.append('username', data?.username)
    dataForm.append('email', data?.email)
    if (dataForm.get('birthday') === null || dataForm.get('birthday') === '') {
      dataForm.delete('birthday')
    }
    updateData(dataForm)
  }
  const handlePressEnter = (e:any) => {
    e.keyCode === 13 && handleSubmitEdit()
  }
  return (
    <>
      {loading && <PageLoading />}
      <ModalContainer>
        <div onKeyDown={handlePressEnter} className={`${styles.edit_container} animate__animated animate__bounceIn`}>
          <div className={styles.edit_title}>
            <EditIcon />
            <h3>Actualizar Perfil</h3>
          </div>
          <div className={styles.edit_body}>

            <form ref={formRef} action="">

              <div className="input_group">
                <div className="">
                  <input className='' name='name' type="text" onChange={(e) => {setName(e.target.value)}} value={name}/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Nombres</label>
                </div>
                <span className="helptext"></span>
              </div>

              <div className="input_group">
                <div className="">
                  <input className='' name='last_name' type="text" onChange={(e) => {setLastName(e.target.value)}} value={lastName}/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Apellidos</label>
                </div>
                <span className="helptext"></span>
              </div>

              <div className="input_group">
                <div className="">
                  <input className='' name='phone' type="text" onChange={(e) => {setPhone(e.target.value)}} value={phone}/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Teléfono</label>
                </div>
                <span className="helptext"></span>
              </div>

              <div className="input_group">
                <div className="">
                  <input className='' name='address' type="text" onChange={(e) => {setAddress(e.target.value)}} value={address}/>
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

            </form>

          </div>
          <div className={styles.edit_options}>
            <button className={styles.edit_confirm} onClick={handleSubmitEdit}>Si</button>
            <button className={styles.edit_cancel} onClick={close}>No</button>
          </div>
        </div>
      </ModalContainer>
    </>
  )
}

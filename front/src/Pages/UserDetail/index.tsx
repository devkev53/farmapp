import { useEffect, useRef, useState } from 'react';
import { EditIcon } from '../../components/UI/icons/EditIcon';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './styles.module.css'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad';
import { getByIdUser } from '../../services/users.service';
import { PageLoading } from '../../components/UI/PageLoading';
import { useModal } from '../../hooks/useModal';
import { EditBaseModal } from '../../components/UI/EditBaseModal';
import { CamAddIcon } from '../../components/UI/icons/CamAddIcon';
import { ModalContainer } from '../../containers/ModalContainer';
import { ChangeImgModal } from '../../components/ChangeImgModal';
import { EditUserModal } from '../../components/EditUserModal';
import { UserCheckIcon } from '../../components/UI/icons/UserCheckIcon';
import { CardIdIcon } from '../../components/UI/icons/CardIdIcon';
import { MailIcon } from '../../components/UI/icons/MailIcon';
import { PhoneIcon } from '../../components/UI/icons/PhoneIcon';
import { CakeIcon } from '../../components/UI/icons/CakeIcon';
import { AddressBookIcon } from '../../components/UI/icons/AddressBookIcon';
import { KeyIcon } from '../../components/UI/icons/keyIcon';
import { ChangePasswordModal } from '../../components/ChangePasswordModal';
import { userInfoI } from '../../models';

const index = () => {

  const [userData, setUserData] = useState<userInfoI>()
  const imgRef = useRef(null)

  const {user} = useAuthContext()
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const {isVisible:editVisible, showModal:showEdit, closeModal:closeEdit} = useModal()
  const {isVisible:imgModalVisible, showModal:showImgModal, closeModal:closeimgModal} = useModal()
  const {isVisible:passModalVisible, showModal:showPassModal, closeModal:closePassModal} = useModal()

  const getData = async() => {
    let response
    user && user.id && (response = await callEndpoint(getByIdUser(user.id)))
    // console.log(response.data)
    setUserData(response?.data)
  }

  useEffect(()=>{
    user && getData()
  },[user])

  const handleClickImg = () =>{
    showImgModal()
  }


  return (
    <>
      {imgModalVisible &&
        <ChangeImgModal data={userData} lastImg={userData?.url_img} close={closeimgModal} title='Actualizar Imágen' />
      }
      {editVisible &&
        <EditUserModal close={closeEdit} data={userData}/>
      }
      {passModalVisible &&
        <ChangePasswordModal title="Cambiar Contraseña" close={closePassModal} />
      }

      {isLoading && <PageLoading />}
      <div className={styles.user_detail_content}>

        <div className={styles.title_container}>
          <h2>User info</h2>
          <button onClick={showEdit} className={styles.editIcon}>
            <EditIcon />
            <span>Editar</span>
          </button>
        </div>

        <div className={styles.content_page}>

          <picture className={styles.user_picture}>
            <div className={styles.img_container} onClick={handleClickImg}>
              <div className={styles.hoverContent}>
                <CamAddIcon/>
              </div>
              {userData?.image === null
                ? <img src={userData?.url_img} />
                : <img src={`http://localhost:8000${userData?.url_img}`} />
              }
            </div>
            <p>{userData?.username}</p>
          </picture>

          <div className={`${styles.info_container} ${styles.user_info}`}>
              <p> <UserCheckIcon /> {userData?.username}</p>
              <p> <CardIdIcon /> 
                {
                  !userData?.name && !userData?.last_name 
                    ?  'No Registrado'
                    : `${userData?.name} ${userData?.last_name}`
                }
              </p>
              <p> <MailIcon/> {userData?.email}</p>
          </div>

          <div className={`${styles.info_container} ${styles.profile_info}`}>
            <p> <PhoneIcon/> {`${userData?.phone ? userData?.phone : 'No Registrado'}`}</p>
            <p> <AddressBookIcon/> {`${userData?.address ? userData?.address : 'No Registrado'}`}</p>
            <p> <CakeIcon /> {`${userData?.birthday ? userData?.birthday : 'No Registrado'}`}</p>
          </div>
        
        </div>

        <div className={styles.change_password}>
          <button onClick={showPassModal}> <KeyIcon/> Cambiar Contraseña</button>
        </div>
        
      </div>
    </>
  )
}

export default index;
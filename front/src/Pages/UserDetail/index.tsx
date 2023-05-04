import { useEffect, useRef, useState } from 'react';
import { EditIcon } from '../../components/UI/icons/EditIcon';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './styles.module.css'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad';
import { getByIdUser } from '../../services/users.service';
import { PageLoading } from '../../components/UI/PageLoading';
import { useModal } from '../../hooks/useModal';
import { EditBaseModal } from '../../components/UI/EditBaseModal';
import { EditUserModal } from '../../containers/EditUserModal';
import { CamAddIcon } from '../../components/UI/icons/CamAddIcon';
import { ModalContainer } from '../../containers/ModalContainer';
import { ChangeImgModal } from '../../components/ChangeImgModal';

const index = () => {

  const [userData, setUserData] = useState()
  const imgRef = useRef(null)

  const {user} = useAuthContext()
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const {isVisible:editVisible, showModal:showEdit, closeModal:closeEdit} = useModal()
  const {isVisible:imgModalVisible, showModal:showImgModal, closeModal:closeimgModal} = useModal()

  const getData = async() => {
    const response = await callEndpoint(getByIdUser(user.id))
    // console.log(response.data)
    setUserData(response.data)
  }

  useEffect(()=>{
    user && getData()
  },[user])

  const handleClickImg = () =>{
    showImgModal()
    imgRef.current.click()
  }


  return (
    <>
      {imgModalVisible &&
        <ChangeImgModal title='Actualizar Imágen' />
      }
      {editVisible &&
        <EditBaseModal 
          id={userData?.id}
          close={closeEdit}
          title="Editar Perfil"
        >
          <EditUserModal data={userData} />  
        </EditBaseModal>
      }

      {isLoading && <PageLoading />}
      <div>

        <div className={styles.title_container}>
          <h2>User info</h2>
          <button onClick={showEdit} className={styles.editIcon}>
            <EditIcon />
            <span>Delete</span>
          </button>
        </div>

        <div className={styles.content_page}>

          <picture className={styles.user_picture}>
            <div className={styles.img_container} onClick={handleClickImg}>
              <div className={styles.hoverContent}>
                <CamAddIcon/>
              </div>
              <input ref={imgRef} type="file"/>
              {userData?.image === null
                ? <img src={userData?.url_img} />
                : <img src={`http://localhost:800${userData?.url_img}`} />
              }
            </div>
            <p>{userData?.username}</p>
          </picture>

          <div className={`${styles.info_container} ${styles.user_info}`}>
              <p>{userData?.username}</p>
              <p>{userData?.name} {userData?.last_name}</p>
              <p>{userData?.email}</p>
          </div>

          <div className={`${styles.info_container} ${styles.profile_info}`}>
            <p>{`${userData?.phone ? userData?.phone : '--------'}`}</p>
            <p>{`${userData?.address ? userData?.address : '--------'}`}</p>
            <p>{`${userData?.birthday ? userData?.birthday : '--------'}`}</p>
          </div>
        
        </div>
        
      </div>
    </>
  )
}

export default index;
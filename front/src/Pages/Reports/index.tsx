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

const index = () => {

  const {isLoading} = useFetchAndLoad()

  return (
    <>
      {isLoading && <PageLoading />}
      <div>

        <div className={styles.title_container}>
          <h2>Reportes</h2>
          <button onClick={()=>{}} className={styles.editIcon}>
            <EditIcon />
            <span>Editar</span>
          </button>
        </div>

        <div className={styles.content_page}>
        
        </div>
        
      </div>
    </>
  )
}

export default index;
import { ReactNode, useEffect, useRef, useState } from "react";
import { ModalContainer } from "../../containers/ModalContainer";
import { CamAddIcon } from "../UI/icons/CamAddIcon";
import styles from './styles.module.css'
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { updateImgUser } from "../../services/users.service";
import { updateChangeUserProfileLocalStorage } from "../../utilities/localStorage_user.utility";
import { useAuthContext } from "../../hooks/useAuthContext";
import { PageLoading } from "../UI/PageLoading";
export const ChangeImgModal = (
  {data, title, close, lastImg}:
  {
    data:any
    title:string,
    lastImg:string | undefined
    close:()=>void
  }) => {

  const [img, setImg] = useState(lastImg)
  const [isChangeImg, setIsChangeImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const refInputImg = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const {setLoginData} = useAuthContext()


  useEffect(()=>{
    refInputImg  !== null && refInputImg.current?.click()
    // refInputImg !== null && refInputImg.current.click()
  },[])

  const updateImg = async(id:number, data:{}) => {
    setLoading(true)
    try {
      const response = await callEndpoint(updateImgUser(id, data))
      if(response.status === 200) {
        const data = updateChangeUserProfileLocalStorage(response.data)
        setLoginData(data)
        setTimeout(() => {
          setLoading(false)
          close()
        }, 2000);
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      close()
    }
  }

  const handelInputChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const imgPreview = window.document.querySelector('.preview_img')!
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imgPreview.setAttribute('src', `${e.target?.result}`)
      }
      reader.readAsDataURL(e.target.files[0])
      setIsChangeImg(true)
    }
  }

  const handlePressEnter = (e:any) => {
    e.keyCode === 13 && handleSubmitEdit(e)
  }

  const handleSubmitEdit = (e:any) => {
    const form = formRef.current
    const dataForm = new FormData(form!)
    isChangeImg ? updateImg(data?.id, dataForm) : close()
  }

  // console.log(data)
  
  return (
    <>
      {loading && <PageLoading />}
      <ModalContainer>
        <div onKeyDown={handlePressEnter} className={`${styles.edit_container} animate__animated animate__bounceIn`}>
          <div className={styles.edit_title}>
            <CamAddIcon />
            <h3>{title}</h3>
          </div>
          <div className={styles.edit_body}>
            <form ref={formRef} action="">
              <input type="text" name="username" value={data?.username} readOnly/>
              <input type="email" name="email" value={data?.email} readOnly/>
              <input name="image" onChange={handelInputChange} ref={refInputImg} type="file" required/>
            </form>
            <picture className={styles.picture_container}>
              <div className={styles.hover_img} onClick={()=>{refInputImg.current!.click()}}>
                <CamAddIcon />
              </div>
              {data?.image === null
                ? <img className="preview_img" src={img} />
                : <img className="preview_img" src={`http://localhost:8000${img}`} />
              }
            </picture>
          </div>
          <div className={styles.edit_options}>
            <button className={styles.edit_confirm} onClick={handleSubmitEdit}>Si</button>
            <button className={styles.edit_cancel} onClick={close}>No</button>
          </div>
        </div>
      </ModalContainer>
    </>
  );
}

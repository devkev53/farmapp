import React, { useRef, useState } from 'react'
import styles from './styles.module.css'
import { SaveIcon } from '../../components/UI/icons/SaveIcon'
import { addPlantation } from '../../services/plantations.service'
import { ArrowDownIcon } from '../../components/UI/icons/ArrowDownIcon'
import { useNavigate } from 'react-router-dom'
import CircleSpinner from '../../components/UI/spiners/CircleSpinner' 
import { ModalContainer } from '../../containers/ModalContainer'
import { PageLoading } from '../../components/UI/PageLoading'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad'

const index = () => {

  const [showGroundFields, setShowGroundFields] = useState(false)

  const formRef = useRef(null)
  const navigate = useNavigate()
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const handleChangeTextArea = (e) => {
    let isEmpty = true
    e.target.value.length > 0 ? e.target.classList.add(`${styles.content}`) : e.target.classList.remove(`${styles.content}`)
  }
  const handleCropCof = (e) => {
    let isEmpty = true
    const isValid = e.target.checkValidity();
    // console.log(isValid)
    if (e.target.value.length > 0) {
      e.target.classList.add(`${styles.content}`)
    }else{
      e.target.classList.remove(`${styles.content}`)
    }
  }


  const handleSubmitForm = (e:any) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const response = callEndpoint(addPlantation(data))
    response.then(resp => {
      if (resp.status === 201) {
        navigate(`/plantations-detail/${resp.data.id}`)
      }
    })
  }

  const handleShowGroundFields = () => {
    setShowGroundFields(!showGroundFields)
  }

  console.log(isLoading)

  return (<>
    { isLoading && <PageLoading/>}
    <div className="styles dashboardContainer">
      <div className={styles.title_container}>
        <h2>Nuevo Cultivo</h2>
      </div>
      
      <div className="fomr_container">
        <form onSubmit={handleSubmitForm} ref={formRef} className={styles.plantation_form}>

          {/* Informacion del Cultivo */}
          <div>

            <div className={styles.title_section}>
              <h4>Información del Cultivo</h4>
              {/* <ArrowDownIcon /> */}
            </div>

            <div className={styles.section_content}>

              <div className={styles.input_group}>
                <div className="">
                  <input className='thscm' name='name' type="text" required/>
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Nombre</label>
                </div>
                <span className={styles.helptext}></span>
              </div>

              <div className={styles.text_group}>
                <div className="">
                  <textarea name='description' onChange={handleChangeTextArea}/>
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Descripcion</label>
                </div>
                <span className={styles.helptext}></span>
              </div>

              <div className={styles.input_group}>
                <div className="">
                  <input name='duration' type="number" required/>
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Duración</label>
                </div>
                <span className={styles.helptext}>
                  Duración de cosecha estimada en dias</span>
              </div>

              <div className={`${styles.input_group} ${styles.noRequired}`}>
                <div className="">
                  <input onChange={handleCropCof} name='crop_coeficient' type="text"/>
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Coeficiente de cultivo</label>
                </div>
                <span className={styles.helptext}>relación entre las necesidades hídricas del cultivo (ETc)</span>
              </div>
            </div>
          </div>

          {/* Informacion de Hardawre */}
          <div>
            <div className="">
              <div className={styles.title_section}>
                <h4>Datos del Hardware</h4>
              </div>
              {/* <small>Número de identificación Módulo de control del sensor de temperatura y humedad</small> */}
            </div>
            <div className={styles.input_group}>
              <div>
                <input name='thscm' type="text" required/>
                <span className={styles.highlight}></span>
                <span className={styles.bar}></span>
                <label>THSCM</label>
              </div>
              <span className={styles.helptext}>Módulo de control del sensor de temperatura y humedad</span>
            </div>
          </div>

          {/* Inforamacion de la Tierra */}
          <div>

            {/* Titulo */}
            <div className={styles.title_section}>
              <h4>Informacion de la Tierra</h4>
              <button type='button' onClick={(handleShowGroundFields)} className={`${showGroundFields && styles.rotateIcon}`}>
                <ArrowDownIcon />
              </button>
            </div>

            {/* Inputs */}
            <div className={`${styles.section_content} ${styles.section_ground} ${showGroundFields && styles.show_fields}`}>
              
              {/* Area */}
              <div className={styles.input_group}>
                <div className="">
                  <input name='area' type="text"/>
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Área</label>
                </div>
                <span className={styles.helptext}></span>
              </div>

              {/* Perimetro */}
              <div className={styles.input_group}>
                <div className="">
                  <input name='perimeter' type="text"/>
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Perímetro</label>
                </div>
                <span className={styles.helptext}></span>
              </div>

              {/* Capacidad */}
              <div className={styles.input_group}>
                <div className="">
                  <input name='ability' type="text"/>
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Capacidad</label>
                </div>
                <span className={styles.helptext}></span>
              </div>

              {/* Marchitamiento */}
              <div className={styles.input_group}>
                <div className="">
                  <input name='wilting_point' type="text"/>
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Punto de Marchitamiento</label>
                  <span className={styles.helptext}></span>
                </div>
              </div>

            </div>

          </div>

          
          <button type='submit' className={styles.form_btn}>
            <span>
              <SaveIcon />
              Guardar
            </span>
          </button>
        </form>
      </div>
    </div>
  </>)
}

export default index
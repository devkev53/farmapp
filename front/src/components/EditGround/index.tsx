import { ChangeEventHandler, useState } from 'react'
import styles from './styles.module.css'
import { ArrowBack } from '../UI/icons/ArrowBack'
import { SaveIcon } from '../UI/icons/SaveIcon'
import { EditIcon } from '../UI/icons/EditIcon'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad'
import { updateGroundOrThscm } from '../../services/plantations.service'
import { useNavigate } from 'react-router-dom'

export const EditGround = (
  {id, area, perimeter, ability, wilting_point, thscm, edit, handleEdit}:{
    id: number
    area:number,
    perimeter:number,
    ability:number,
    wilting_point:number,
    thscm: string
    edit:boolean
    handleEdit: () => {}
  }
  ) => {

    const [valueTHSCM, setValueTHSCM] = useState(thscm)
    const [valueArea, setValueArea] = useState(area)
    const [valuePerimeter, setValuePerimeter] = useState(perimeter)
    const [valueAbility, setValueAbility] = useState(ability)
    const [valueWilting, setValueWilting] = useState(wilting_point)

    const {isLoading, callEndpoint} = useFetchAndLoad()
    const navigate = useNavigate()

    const handleChangeTHSCM = (e:any) => {
      setValueTHSCM(e.target.value)
    }

    const handleChangeArea = (e:any) => {
      setValueArea(e.target.value)
    }
    
    const handleChangePerimeter = (e:any) => {
      setValuePerimeter(e.target.value)
    }
    const handleChangeAbility = (e:any) => {
      setValueAbility(e.target.value)
    }
    const handleChangeWilting = (e:any) => {
      setValueWilting(e.target.value)
    }

    const handleSubmit = (e:any) => {
      e.preventDefault()
      const data = new FormData(e.target)
      const response = callEndpoint(updateGroundOrThscm(id, data))
      response.then(resp => {
        console.log(resp)
        if (resp.status === 200) {
          navigate(0)
        }
      })
    }

  return (
    <form onSubmit={handleSubmit} className={`${styles.ground} ${styles.content_container}`}>
      <div className={styles.title}>
        <h3>Terreno</h3>
        <div className={`${styles.options_btns}`}>
          <button type='button' className={styles.edit_btn} onClick={handleEdit}>
            <ArrowBack />
          </button>
          <button type='submit' className={styles.save_btn} onClick={()=>{}}>
            <SaveIcon />
          </button>
        </div>
      </div>

      <div className={`content_info`}>

        {/* THSCM */}
        <div className={`input_group`}>
          <div>
            <input name='thscm' className={styles.thscm} type="text" required value={valueTHSCM} onChange={handleChangeTHSCM}/>
            <span className={`highlight`}></span>
            <span className={`bar`}></span>
            <label>THSCM</label>
          </div>
          <span className={`helptext`}>Módulo de control del sensor de temperatura y humedad</span>
        </div>

        {/* Area */}
        <div className={`input_group`}>
          <div className="">
            <input name='area' type="number" value={valueArea} onChange={handleChangeArea}/>
            <span className={`highlight`}></span>
            <span className={`bar`}></span>
            <label>Área</label>
          </div>
          <span className={`helptext`}></span>
        </div>
        
        {/* Perimetro */}
        <div className={`input_group`}>
          <div className="">
            <input name='perimeter' type="number" value={valuePerimeter} onChange={handleChangePerimeter}/>
            <span className={`highlight`}></span>
            <span className={`bar`}></span>
            <label>Perímetro</label>
          </div>
          <span className={`helptext`}></span>
        </div>

        {/* Capacidad */}
        <div className={`input_group`}>
          <div className="">
            <input name='ability' type="number" value={valueAbility} onChange={handleChangeAbility}/>
            <span className={`highlight`}></span>
            <span className={`bar`}></span>
            <label>Capacidad</label>
          </div>
          <span className={`helptext`}></span>
        </div>

        {/* Marchitamiento */}
        <div className={`input_group`}>
          <div className="">
            <input name='wilting_point' type="number" value={valueWilting} onChange={handleChangeWilting}/>
            <span className={`highlight`}></span>
            <span className={`bar`}></span>
            <label>Punto de Marchitamiento</label>
            <span className={`helptext`}></span>
          </div>
        </div>
        

      </div>
    </form>
  );
}

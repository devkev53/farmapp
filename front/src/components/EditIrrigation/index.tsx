import { useEffect, useState } from "react"
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad"
import { getByIdIrrigation } from "../../services/irrigations.service"
import { irrigationI } from "../../models/plantations.models"


export const EditIrrigation = ({id}:{id:number}) => {
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const {isLoading, callEndpoint} = useFetchAndLoad()

  const getData = async () => await callEndpoint(getByIdIrrigation(id))
  
  useEffect(() => {
    const data = getData()
    data.then(data => {
      setStartTime(data.data.start_time)
      setEndTime(data.data.end_time)
      // console.log(data.data)
    })
  },[])

  const handleChangeStartTime = (e:any) => {
    setStartTime(e.target.value)
  }

  const handleChangeEndTime = (e:any) => {
    setEndTime(e.target.value)
  }

  return (
    <form className="edit_irrigation" action="">
      {/* Inicio */}
      <div className={`input_group`}>
        <div>
          <input name='start_time' type="time" onChange={handleChangeStartTime} required value={startTime} autoFocus />
          <span className={`highlight`}></span>
          <span className={`bar`}></span>
          <label>Hora de Inicio</label>
        </div>
        <span className={`helptext`}>Tiempo de inicio del riego</span>
      </div>

      {/* Fin */}
      <div className={`input_group`}>
        <div>
          <input name='end_time' type="time" required onChange={handleChangeEndTime} value={endTime}/>
          <span className={`highlight`}></span>
          <span className={`bar`}></span>
          <label>Hora de Fin</label>
        </div>
        <span className={`helptext`}>Tiempo de finalización del riego</span>
      </div>

    </form>
  )
}

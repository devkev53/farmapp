import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'
import check from './check.module.css'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad';
import { PageLoading } from '../../components/UI/PageLoading';
import { getAll } from '../../services/reports.service';
import { PrinterIcon } from '../../components/UI/icons/PrinterIcon';

const index = () => {
  
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [dates, setDates] = useState(false)
  const [reportNumber, setReportNumber] = useState(0)
  
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const formRef = useRef<HTMLFormElement>(null)


  const getReport = async() => {
    const data = {'start_date': start, 'end_date':end}
    let response
    if (reportNumber === 0) {
      response = await callEndpoint(getAll(data))
    } else {
      return alert("El reporte no existe")
    }
    console.log(response)
    const blob = response.data
    const fileURL = window.URL.createObjectURL(blob)
    let alink = document.createElement('a')
    alink.href = fileURL
    alink.target = '_blank'
    alink.click()
  }

  const changeStartDate:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStart(e.target.value)
  }

  const changeEndDate:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEnd(e.target.value)
  }

  const handleActiveBtnReport:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setReportNumber(parseInt(e.currentTarget.getAttribute('data-report')!))
    const buttons = window.document.querySelectorAll(`.${styles.button_report}`)
    buttons.forEach(button => {
      button.classList.remove(`${styles.active}`)
    });
    e.currentTarget.classList.add(`${styles.active}`)
  } 

  useEffect(() => {
    if (dates===false) {
      setStart('')
      setEnd('')
    }
  }, [setDates])


  return (
    <>
      {isLoading && <PageLoading />}
      <div>

        <div className={styles.title_container}>
          <h2>Reportes</h2>
          {/* <button onClick={()=>{}} className={styles.editIcon}>
            <EditIcon />
            <span>Editar</span>
          </button> */}
        </div>

        <div className={styles.options_reports}>
          <button className={`${styles.button_report} ${styles.active}`} data-report={0} onClick={handleActiveBtnReport}>Cultivos</button>
          <button className={`${styles.button_report}`} data-report={1} onClick={handleActiveBtnReport}>Riegos</button>
        </div>

        <div className={styles.container_report}>
          <div className={styles.for_dates}>
            <div className={check.checkbox_wrapper_44}>
              <label className={check.toggleButton}>
                <input type="checkbox" onChange={()=>{setDates(!dates)}}/>
                <div>
                  <svg viewBox="0 0 44 44">
                    <path transform="translate(-2.000000, -2.000000)" d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"></path>
                  </svg>
                </div>
              </label>
            </div>
            <label htmlFor="filter">Reporte por fechas</label>
          </div>
          
          {dates && (<>
            <div className={`animate__animated animate__fadeIn ${styles.options}`}>
              <form action="" ref={formRef}>
                <div className="input_group">
                  <label htmlFor="start_date">Fecha de Inicio</label>
                  <div className="">
                    <input type="date" name="start_date" onChange={changeStartDate}/>
                  </div>
                </div>

                <div className="input_group">
                  <label htmlFor="end_date">Fecha de Fin</label>
                  <div className="">
                    <input type="date" name="end_date" onChange={changeEndDate}/>
                  </div>
                </div>
              </form>
            </div>
          </>)}

        </div>


        <div className={styles.download_btn}>
          <button onClick={getReport}><PrinterIcon/> Descargar PDF</button>
        </div>
        
      </div>
    </>
  )
}

export default index;
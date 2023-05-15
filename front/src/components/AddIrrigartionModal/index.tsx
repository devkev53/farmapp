import { useParams } from "react-router-dom";
import { ModalContainer } from "../../containers/ModalContainer";
import { DropIcon } from "../UI/icons/DropIcon";
import './styles.css'
import { useRef } from "react";

export const AddIrrigartionModal = (
  {close, addFn}:
  {close:()=>void, addFn:(data:any)=>void}
) => {

  const params = useParams()
  const formRef = useRef(null)

  const handleSubmit = () => {
    const data = new FormData(formRef.current!)
    params.id && data.append("plantation", params.id?.toString())
    const start = data.get('start_time')
    const end = data.get('end_time')
    if (start === '' || end === '') {
      return alert('Verifique los campos')
    }
    if (end! <= start!) {
      return alert('El inicio debe ser menor al final del riego')
    }
    addFn(data)
  }

  const handlePressEnter = (e:any) => {
    e.keyCode === 13 && handleSubmit()
  }

  return (
    <ModalContainer>
      <div onKeyDown={handlePressEnter} className="container animate__animated animate__bounceIn">
        <div className="title">
          <DropIcon />
          <h3>Agregar nuevo tiempo de riego</h3>
        </div>
        <div className="body">
          <form onSubmit={addFn} ref={formRef} className="addIrrigation" action="">
            
            {/* Inicio */}
            <div className={`input_group`}>
              <div>
                <input name='start_time' type="time" required autoFocus />
                <span className={`highlight`}></span>
                <span className={`bar`}></span>
                <label>Hora de Inicio</label>
              </div>
              <span className={`helptext`}>Tiempo de inicio del riego</span>
            </div>

            {/* Fin */}
            <div className={`input_group`}>
              <div>
                <input name='end_time' type="time" required />
                <span className={`highlight`}></span>
                <span className={`bar`}></span>
                <label>Hora de Fin</label>
              </div>
              <span className={`helptext`}>Tiempo de finalización del riego</span>
            </div>

          </form>
        </div>
        <div className="options">
          <button className="confirm" onClick={handleSubmit}>Guardar</button>
          <button className="cancel" onClick={close}>Cancelar</button>
        </div>
      </div>
    </ModalContainer>
  );
}

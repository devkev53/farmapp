import { ModalContainer } from "../../containers/ModalContainer";
import { DropIcon } from "../UI/icons/DropIcon";
import './styles.css'

export const AddIrrigartionModal = ({close}:{close:()=>void}) => {
  return (
    <ModalContainer>
      <div className="container">
        <div className="title">
          <DropIcon />
          <h3>Agregar nuevo tiempo de riego</h3>
        </div>
        <div className="body">
          <form action="">
            
            {/* Inicio */}
            <div className={`input_group`}>
              <div>
                <input name='thscm' type="text" required />
                <span className={`highlight`}></span>
                <span className={`bar`}></span>
                <label>Hora de Inicio</label>
              </div>
              <span className={`helptext`}>Tiempo de inicio del riego</span>
            </div>

            {/* Fin */}
            <div className={`input_group`}>
              <div>
                <input name='thscm' type="text" required />
                <span className={`highlight`}></span>
                <span className={`bar`}></span>
                <label>Hora de Fin</label>
              </div>
              <span className={`helptext`}>Tiempo de finalización del riego</span>
            </div>

          </form>
        </div>
        <div className="options">
          <button className="confirm">Guardar</button>
          <button className="cancel" onClick={close}>Cancelar</button>
        </div>
      </div>
    </ModalContainer>
  );
}

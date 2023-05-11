import { useEffect, useState } from "react";
import { ModalContainer } from "../../containers/ModalContainer";
import { PageLoading } from "../UI/PageLoading";
import { DropIcon } from "../UI/icons/DropIcon";

import styles from './styles.module.css'

export const ModalTimeCountActive = ({close}:{close:()=>void}) => {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0})
  const [interv, setInterv] = useState<any>()
  const [status, setStatus] = useState(0)
  // Not started = 0
  // started = 1
  
  let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h

  const start = () => {
    run()
    setStatus(1)
    setInterv(setInterval(run, 10))
  }

  const stop = () => {
    clearInterval(interv)
  }
  const run = () => {
    if (updatedM === 60) {
      updatedH++
      updatedM = 0
    }
    if (updatedS === 60) {
      updatedM++
      updatedS = 0
    }
    if (updatedMs === 60) {
      updatedS++
      updatedMs = 0
    }

    updatedMs++
    return setTime({
      ms:updatedMs, 
      s:updatedS, 
      m:updatedM, 
      h:updatedH
    })
  }

  useEffect(() => {
    start()
  },[])
  
  const handleStop = () => {
    stop()
    setStatus(2)
    setTimeout(() => {
      setStatus(0)
      close()
    }, 2000);
  }

  return (
    <ModalContainer>
      {status === 2 && <PageLoading />}
      <div className={styles.container}>
        <div className={styles.title}>
          <DropIcon />
          Riego Manual
        </div>
        <div className={styles.body}>
          <div className={styles.counter}>
            <p>Tiempo de activación del riego</p>
            <h3>
              <span>{time.h >= 10 ? time.h : "0"+time.h}</span>
              &nbsp;:&nbsp;
              <span>{time.m >= 10 ? time.m : "0"+time.m}</span>
              &nbsp;:&nbsp;
              <span>{time.s >= 10 ? time.s : "0"+time.s}</span>
            </h3>
          </div>
          <button onClick={handleStop}>Detener</button>
        </div>
      </div>
    </ModalContainer>
    
  );
}

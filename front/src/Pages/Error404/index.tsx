import tomato from '../../assets/tomato.png'
import onion from '../../assets/cebolla.png'
import lettuce from '../../assets/lechuga.png'
import radish from '../../assets/rabano.png'
import cabbage from '../../assets/repollo.png'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

const index = () => {

  const [num, setNum] = useState(0)
  const [img, setImg] = useState('')
  
  const getRandomNum = () => {
    setNum(Math.floor(Math.random() * 5))
    return getImg()
  }

  const getImg = () => {
    if (num === 0) {
      setImg(tomato)
    } else if (num === 1) {
      setImg(onion)
    } else if (num === 2) {
      setImg(lettuce)
    } else if (num === 3) {
      setImg(radish)
    } else if (num === 4) {
      setImg(cabbage)
    }
  }

  useEffect(() => {
    getRandomNum()
  },[num])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.error_message}>
          <h3>Error</h3>
          <h2>4 <img src={img} alt="" /> 4</h2>
        </div>
        <h3>Esta Pagina No existe o fue removida</h3>
        <Link to="/">Darshboard</Link>
      </div>
    </div>
  );
}

export default index;
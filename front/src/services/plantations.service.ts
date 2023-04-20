import axios from 'axios'
import { loadAbort } from '../utils/load-abort-axios.utility'

const plantations_url = `${import.meta.env.VITE_BACKEND_URL}api/plantations/`

export const getPlantations = () => {
  const controller = loadAbort()
  return {call: axios.get(plantations_url, {signal: controller.signal}), controller}
}
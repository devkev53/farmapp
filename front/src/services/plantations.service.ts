import axios from 'axios'
import { loadAbort } from '../utils/load-abort-axios.utility'

const plantations_url = `${import.meta.env.VITE_BACKEND_URL}plantations/`

export const loginService = () => {
  const controller = loadAbort()
  return {call: axios.post(plantations_url, {signal: controller.signal}), controller}
}
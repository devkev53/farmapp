import axios from 'axios'
import { loadAbort } from '../utils/load-abort-axios.utility'

const login_url = `${import.meta.env.VITE_BACKEND_URL}login/`

export const loginService = (data) => {
  const controller = loadAbort()
  return {call: axios.post(login_url, data, {signal: controller.signal}), controller}
}
import axios from 'axios'
import { loadAbort } from '../utils/load-abort-axios.utility'
import { axiosPrivateInstance } from '../utilities/axios-instances'

const plantations_url = `${import.meta.env.VITE_BACKEND_URL}api/plantations/`

export const getPlantations = () => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.get(plantations_url, {signal: controller.signal}), controller}
}

export const getIdPlantation = (id) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.get(`${plantations_url}${id}`, {signal: controller.signal}), controller}
}
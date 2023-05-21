import axios from 'axios'
import { loadAbort } from '../utilities/load-abort-axios.utility'
import { axiosPrivateInstance } from '../utilities/axios-instances'

const baseURL = import.meta.env.VITE_DOCKER_BACKEND_URL
const plantations_url = `${baseURL}/api/plantations/`

export const getPlantations = () => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.get(plantations_url, {signal: controller.signal}), controller}
}

export const getIdPlantation = (id:string) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.get(`${plantations_url}${id}`, {signal: controller.signal}), controller}
}

export const addPlantation = (data:{}) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.post(`${plantations_url}`, data, {signal: controller.signal}), controller}
}

export const deletePlantation = (id:string) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.delete(`${plantations_url}${id}`, {signal: controller.signal}), controller}
}

export const updateGroundOrThscm = (id:number, data:{}) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.put(`${plantations_url}${id}/`, data, {signal: controller.signal}), controller}
}
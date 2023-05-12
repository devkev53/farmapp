import axios from 'axios'
import { loadAbort } from '../utils/load-abort-axios.utility'
import { axiosPrivateInstance } from '../utilities/axios-instances'

const irrigations_url = `${import.meta.env.VITE_DOCKER_BACKEND_URL}api/irrigations/`
const manual_url = `${import.meta.env.VITE_DOCKER_BACKEND_URL}api/`

export const getIrrigations = () => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.get(irrigations_url, {signal: controller.signal}), controller}
}

export const addIrrigation = (data:{}) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.post(`${irrigations_url}`, data, {signal: controller.signal}), controller}
}

export const deleteIrrigation = (id:number) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.delete(`${irrigations_url}${id}`, {signal: controller.signal}), controller}
}

export const updateIrrigation = (id:number, data:{}) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.put(`${irrigations_url}${id}/`, data, {signal: controller.signal}), controller}
}

export const getByIdIrrigation = (id:number) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.get(`${irrigations_url}${id}/`, {signal: controller.signal}), controller}
}

export const getActivateManualIrrigation = (id:number) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.get(`${manual_url}${id}/active_irrigation/`, {signal: controller.signal}), controller}
}
export const getDeactivateManualIrrigation = (id:number) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.get(`${manual_url}${id}/deactive_irrigation/`, {signal: controller.signal}), controller}
}
import axios from 'axios'
import { loadAbort } from '../utilities/load-abort-axios.utility'
import { axiosPrivateInstance, axiosPublicInstance } from '../utilities/axios-instances'

export const baseURL = import.meta.env.VITE_DOCKER_BACKEND_URL

export const getAll = (data:Object) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.post(`${baseURL}api/report_all_pdf`, data, {signal: controller.signal}), controller}
}

export const getPlantationReport = (id:number) => {
  const controller = loadAbort()
  return {call: axiosPrivateInstance.get(`${baseURL}api/plantation_report_pdf/${id}`, {signal: controller.signal}), controller}
}


// export const refreshTokenService = (refreshToken:string) => {
//   const controller = loadAbort()
//   return {call: axiosPrivateInstance.post(`${login_url}/api/token/refresh/`, {refresh:refreshToken}, {signal: controller.signal}), controller}
// }

export const refreshTokenService = async (refreshToken:string) => {
  const response = await axiosPublicInstance.post(`${baseURL}/api/token/refresh/`, {refresh: refreshToken})
  return response
}
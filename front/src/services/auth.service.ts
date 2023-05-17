import axios from 'axios'
import { loadAbort } from '../utilities/load-abort-axios.utility'
import { axiosPrivateInstance, axiosPublicInstance } from '../utilities/axios-instances'

export const baseURL = import.meta.env.VITE_DOCKER_BACKEND_URL
const login_url = `${baseURL}login/`

export const loginService = (data:{}) => {
  const controller = loadAbort()
  return {call: axiosPublicInstance.post(`${login_url}`, data, {signal: controller.signal}), controller}
}


// export const refreshTokenService = (refreshToken:string) => {
//   const controller = loadAbort()
//   return {call: axiosPrivateInstance.post(`${login_url}/api/token/refresh/`, {refresh:refreshToken}, {signal: controller.signal}), controller}
// }

export const refreshTokenService = async (refreshToken:string) => {
  const response = await axiosPublicInstance.post(`${baseURL}/api/token/refresh/`, {refresh: refreshToken})
  return response
}
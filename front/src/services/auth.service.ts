import axios from 'axios'
import { loadAbort } from '../utils/load-abort-axios.utility'
import { axiosPrivateInstance, axiosPublicInstance } from '../utilities/axios-instances'

const login_url = `${import.meta.env.VITE_BACKEND_URL}login/`
const baseURL = 'http://127.0.0.1:8000'

export const loginService = (data:{}) => {
  const controller = loadAbort()
  return {call: axiosPublicInstance.post(`${baseURL}/login/`, data, {signal: controller.signal}), controller}
}


// export const refreshTokenService = (refreshToken:string) => {
//   const controller = loadAbort()
//   return {call: axiosPrivateInstance.post(`${baseURL}/api/token/refresh/`, {refresh:refreshToken}, {signal: controller.signal}), controller}
// }

export const refreshTokenService = async (refreshToken:string) => {
  const response = await axiosPublicInstance.post(`${baseURL}/api/token/refresh/`, {refresh: refreshToken})
  return response
}
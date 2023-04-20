import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { getValidationError } from "../utilities"
import { SnackbarUtilities } from "../utilities/snackbar-manager"
import { getUser } from "../utils/localStorage_user.utility"

export const PrivatePublicInterceptor = () => {
  const updateHeader = (request:AxiosRequestConfig) => {
    const {token} = getUser()
    const newHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    request.headers = newHeaders
    return request
  }
  
  axios.interceptors.request.use((request) => {
    if (request.url?.includes('assets')) return request
    const newRequest:InternalAxiosRequestConfig = updateHeader(request)
    // console.log("Startubg Request", newRequest)
    return newRequest
  })

  axios.interceptors.response.use(
    (response) => {
      console.log("Response", response)
      return response
    },
    (error) => {
      // console.log(error)
      SnackbarUtilities.error(getValidationError(error.code))
      console.error("error: ", getValidationError(error.code))
      // Hace una promesa y mata a la peticion.
      return Promise.reject(error)
    }
    )
}
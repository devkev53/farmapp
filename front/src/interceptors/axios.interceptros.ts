import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { getValidationError } from "../utilities"
import { SnackbarUtilities } from "../utilities/snackbar-manager"
import { clearUserLocalStorage, getAuthTokens, getUser, setUserLocalStorage, updateUserLocalStorage } from "../utilities/localStorage_user.utility"
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { accessTokenValidate, refreshTokenValidate } from "../utilities/get-tokens-validation"
import { axiosPrivateInstance, axiosPublicInstance, updateHeader } from "../utilities/axios-instances"
import { refreshTokenService } from "../services/auth.service"



export const PrivateInterceptor = () => {
  
  axiosPrivateInstance.interceptors.request.use(async (request) => {
    
    if (request.url?.includes('assets')) return request
    if (request.url?.includes('login')) return request
    request = updateHeader(request)
    
    const {token, refreshToken} = getAuthTokens()
    
    if (!accessTokenValidate(token)) return request 
    if (refreshTokenValidate(refreshToken)) {
      clearUserLocalStorage()
    }    
    const response = await refreshTokenService(refreshToken)
    const {access, refresh} = response.data
    const data = {token: access, refreshToken: refresh}
    updateUserLocalStorage(data)

    request.headers.Authorization = `Bearer ${response.data.access}`

    return request
  })

  axiosPrivateInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      SnackbarUtilities.error(getValidationError(error.code))
      return Promise.reject(error)
    }
    )
}

export const PublicInterceptor = () => {
  axiosPublicInstance.interceptors.request.use(async(request) => {
    return request
  })
  axiosPublicInstance.interceptors.response.use(
    (response) => {return response}, 
    (error) => { 
      SnackbarUtilities.error(error.response.data.error)
    })
}
import { useAuthContext } from "../hooks/useAuthContext"
import { TokensI, authUserI, userInfoI } from "../models/authUser.models"
import { USER_STATES } from "../utils/user_states"

export const getUser = () => {
  const result = JSON.parse(
    window.localStorage.getItem("back_auth_info")
  ) || USER_STATES.NOT_LOGGED
  return result
}

export const setUserLocalStorage = (user:authUserI) => {
  window.localStorage.setItem("back_auth_info", JSON.stringify(user))
}
export const clearUserLocalStorage = () => {
  window.localStorage.removeItem("back_auth_info")
}

export const getAuthTokens = () => {
  const authInfo = getUser()
  if (authInfo) {
    const {token, refreshToken} = authInfo
    return {token, refreshToken}
  } else {
    return {token: '', refreshToken: ''}
  }
}

export const updateUserLocalStorage = (tokens:any) => {
  const {user} = getUser()
  const data = {user, token: tokens.token, refreshToken: tokens.refreshToken}
  window.localStorage.setItem("back_auth_info", JSON.stringify(data))
} 

export const updateChangeUserProfileLocalStorage = (user:any) => {
 const tokens = getAuthTokens()
 const data = {user, token: tokens.token, refreshToken: tokens.refreshToken}
 return data
}
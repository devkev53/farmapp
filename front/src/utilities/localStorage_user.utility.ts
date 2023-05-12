import { UserStatesTypes, authUserI} from "../models/authUser.models"
import { USER_STATES } from "../utilities/user_states"

export const getUser = () => {
  const localData = window.localStorage.getItem("back_auth_info") || USER_STATES.NOT_LOGGED
  let result: UserStatesTypes = null
  localData !== null && (result = JSON.parse(localData))
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
  if (authInfo !== null && authInfo !== undefined) {
    const {token, refreshToken} = authInfo
    return {token, refreshToken}
  } else {
    return {token: '', refreshToken: ''}
  }
}

export const updateUserLocalStorage = (tokens:any) => {
  const authInfo = getUser()
  if (authInfo !== null && authInfo !== undefined ) {
    const {user} = authInfo
    const data = {user, token: tokens.token, refreshToken: tokens.refreshToken}
    window.localStorage.setItem("back_auth_info", JSON.stringify(data))
  }
} 

export const updateChangeUserProfileLocalStorage = (user:any) => {
 const tokens = getAuthTokens()
 const data = {user, token: tokens.token, refreshToken: tokens.refreshToken}
 return data
}
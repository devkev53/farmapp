import { authUserI } from "../models/authUser.models"
import { USER_STATES } from "./user_states"

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
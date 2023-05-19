import axios from "axios";
import { getAuthTokens, getUser } from "./localStorage_user.utility";

const baseURL = 'http://127.0.0.1:8000'

export const axiosPrivateInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
})

export const axiosPublicInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
})

export const updateHeader = (request:any) => {
  const {token} = getAuthTokens()
  const newHeaders = {
    Accept: 'application/json, text/plain, */*',
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
  request.headers = newHeaders
  return request
}
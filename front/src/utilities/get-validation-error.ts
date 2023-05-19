import { TypeWithKeyI } from "../models"

export const getValidationError = (errorCode:any) => {
  const codeMatcher: TypeWithKeyI<string> = {
    ERR_NETWORK: "Se ropió la red",
    ERR_BAD_REQUEST: "Invalid format on send data",
    UNAUTHORIZED:"",
  }
  return codeMatcher[errorCode]
}
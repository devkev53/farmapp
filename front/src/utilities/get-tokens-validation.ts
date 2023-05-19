import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

export const accessTokenValidate = (token:string) => {
  const {exp}:{exp:number} = jwt_decode(token)
  const isExpired = dayjs.unix(exp).diff(dayjs()) < 1
  // console.log('Access Token is Expired', isExpired)
  return isExpired
}

export const refreshTokenValidate = (refreshToken:string) => {
  const {exp}:{exp:number} = jwt_decode(refreshToken)
  const isExpired = dayjs.unix(exp).diff(dayjs()) < 1
  return isExpired
}
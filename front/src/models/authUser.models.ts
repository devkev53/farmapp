import { AxiosInterceptorManager, InternalAxiosRequestConfig } from "axios";

export interface userInfoI {
  id: number;
  username: string;
  email: string;
  name: string;
  last_name: string;
  image: string;
  url_img: string;
  phone: string,
  address: string,
  birthday: string
}

export interface authUserI {
  token: string;
  refreshToken: string;
  user: userInfoI;
}

export interface TokensI {
  token: string,
  refreshToken: string
}

export type UserStatesTypes = authUserI | undefined | null

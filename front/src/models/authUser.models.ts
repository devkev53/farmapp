export interface userInfoI {
  id: number;
  username: string;
  email: string;
  name: string;
  lastName: string;
  image: string  
}

export interface authUserI {
  token: string;
  refreshToken: string;
  userInfo: userInfoI;
}
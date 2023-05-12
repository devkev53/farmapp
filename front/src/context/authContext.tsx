import { createContext, ReactElement, useEffect, useState } from "react";

import { authUserI, UserStatesTypes } from "../models/authUser.models";
import { USER_STATES } from "../utilities/user_states";
import { getUser } from "../utilities/localStorage_user.utility";
import { userInfoI } from "../models/authUser.models";

export type ValueContextType = {
  userInfo: authUserI | undefined | null;
  setUserInfo:React.Dispatch<React.SetStateAction<authUserI | null | undefined>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

type AuthContextType = {
  userInfo: UserStatesTypes,
  setUserInfo: React.Dispatch<React.SetStateAction<UserStatesTypes>>,
  isLogged: boolean
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}


export const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  setUserInfo: () => {},
  isLogged: false,
  setIsLogged: () => {},
})

export const AuthContextProvider = ({children}:{children:ReactElement}) => {
  const [userInfo, setUserInfo] = useState<UserStatesTypes>(USER_STATES.NOT_KNOWN)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const localUser = getUser()
    localUser !== USER_STATES.NOT_LOGGED && setIsLogged(true)
    setUserInfo(localUser)
  },[])

  return (
    <AuthContext.Provider value={{userInfo, setUserInfo, isLogged, setIsLogged}}>
      {children}
    </AuthContext.Provider>
  )
}

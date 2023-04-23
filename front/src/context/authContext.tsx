import { createContext, ReactElement, useEffect, useState } from "react";

import { authUserI } from "../models/authUser.models";
import { USER_STATES } from "../utils/user_states";
import { getUser } from "../utilities/localStorage_user.utility";

export type ValueContextType = {
  userInfo: authUserI | undefined | null;
  setUserInfo:React.Dispatch<React.SetStateAction<authUserI | null | undefined>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}


export const AuthContext = createContext({})

export const AuthContextProvider = ({children}:{children:ReactElement}) => {
  const [userInfo, setUserInfo] = useState<authUserI | undefined | null>(USER_STATES.NOT_KNOWN)
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

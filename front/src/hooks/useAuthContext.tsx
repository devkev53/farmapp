import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { USER_STATES } from "../utils/user_states";
import { useNavigate } from "react-router-dom";
import { authUserI } from "../models/authUser.models";
import { clearUserLocalStorage, setUserLocalStorage } from "../utils/localStorage_user.utility";
import { ValueContextType } from "../context/authContext";
export const useAuthContext = () => {
  const {
    userInfo, setUserInfo,
    isLogged, setIsLogged
  } = useContext(AuthContext)
  
  const navigate = useNavigate()

  const setLoginData = (data:authUserI) => {
    setUserInfo(data)
    setUserLocalStorage(data)
  }

  const handleLogout = () => {
    clearUserLocalStorage()
    setUserInfo(USER_STATES.NOT_LOGGED)
    setIsLogged(false)
    navigate('/login')
  }

  useEffect(()=>{
    userInfo === USER_STATES.NOT_LOGGED && navigate("/login")
  },[])

  return {
    setLoginData,
    userInfo,
    isLogged,
    handleLogout,
    setIsLogged,
  }
}
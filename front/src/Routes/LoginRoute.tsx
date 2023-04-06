import { useNavigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import Layout from '../containers/Layout'
import { useEffect } from "react"

const LoginRoute = () => {
  const {isLogged} = useAuthContext()
  const navigate = useNavigate()
  console.log(isLogged)
  

  return (
      <Outlet />
  )
}

export default LoginRoute

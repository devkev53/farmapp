import { useNavigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import Layout from '../containers/Layout'
import { useEffect } from "react"
import { USER_STATES } from "../utils/user_states"

const ProtectedRoutes = () => {
  const {userInfo} = useAuthContext()
  const navigate = useNavigate()

  
  useEffect(() => {
    userInfo === USER_STATES.NOT_LOGGED && navigate('/login')
  }, [])

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default ProtectedRoutes

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"

// Import Providers
import { AuthContextProvider } from "../context/authContext"


// import Pages
import Dashboard from '../Pages/Home'
import Login from '../Pages/Login'
import CreateUser from '../Pages/Create'
import Plantations from '../Pages/Plantations'
import Error404 from '../Pages/Error404'
import AddPlantation from '../Pages/AddPlantation'
import DetailPlantation from '../Pages/PlatationDetail'
import UserDetail from '../Pages/UserDetail'
import Reports from '../Pages/Reports'

import ProtectedRoutes from "./ProtectedRoutes"

function App() {

  return (
    <AuthContextProvider>
    <BrowserRouter>
        <Routes>
        
          <Route path="/login" element={<Login/>}/>
          <Route path="/create-user" element={<CreateUser/>}/>

          <Route element={<ProtectedRoutes/>}>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/reports" element={<Reports/>}/>
            <Route path="/profile" element={<UserDetail/>}/>
            <Route path="/plantations" element={<Plantations/>}/>
            <Route path="/plantations-detail/:id" element={<DetailPlantation/>}/>
            <Route path="/add-plantation" element={<AddPlantation/>}/>
          </Route>
          
          <Route path="*" element={<Error404/>}/>
        </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App

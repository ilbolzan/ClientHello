import { ReactNode } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from '../Views/Home/Index'
import Login from '../Views/Login/Index'

interface route {
  page: ReactNode;
}

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      {/* <Route path="/login" element={<Login/>} /> */}
    </Routes>
  </BrowserRouter>
)

const PrivateRoutes = (routeProps:route) => {
  const token = sessionStorage.getItem('tokenHello')

  if(token) {return (
    <>
    {routeProps.page}
    </>
  )} else {return (
    <Navigate to="/login" replace />
  )}
}
export default AppRoutes;
import { ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Background from '../components/background'
import Header from '../components/Header'
import Home from '../Views/Home/Index'
import Keys from '../Views/Keys/Index'
import Load from '../Views/Load/Index'
import Login from '../Views/Login/Index'
import Match from '../Views/Match/Index'
import Tournament from '../Views/Tournament/Index'

interface route {
  page: ReactNode
}

const AppRoutes = () => (
  <BrowserRouter>
    <Header />
    <Background />
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/load" element={<Load />} />
        <Route
          path="/tournament/:id"
          element={<Tournament />}
        />
        <Route
          path="/keys/:category/:id"
          element={<Keys />}
        />
        <Route path="/match" element={<Match />} />
        <Route
          path="/match/quickplay"
          element={<Match />}
        />
      </Routes>
    </div>
  </BrowserRouter>
)

// const PrivateRoutes = (routeProps: route) => {
//   const token = sessionStorage.getItem('tokenHello')

//   if (token) {
//     return <>{routeProps.page}</>
//   } else {
//     return <Navigate to="/login" replace />
//   }
// }
export default AppRoutes

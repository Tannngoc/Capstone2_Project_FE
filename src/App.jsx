import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Webpages from './webpages/Webpages'
import Register from './webpages/navbar/account/Register'
import Login from './webpages/navbar/account/Login'

import ManageUser from './webpages/navbar/account/userhomepage/ManageUser'
import { Market } from './webpages/markets/Market'
import Dashboard from './dashboard/Dashboard'

function App() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}></Route>
        <Route path='/' element={<Webpages isLogin={isLogin} setIsLogin={setIsLogin} />}></Route>
        <Route path='/manageuser' element={<ManageUser />}></Route>
        <Route path='/market' element={<Market />}></Route>

        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

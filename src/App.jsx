import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webpages from './webpages/Webpages'
import Register from './webpages/navbar/account/Register'
import Login from './webpages/navbar/account/Login'

import ManageUser from './dashboard/component/ManageUser'
import { Market } from './webpages/markets/Market'
import Dashboard from './dashboard/Dashboard'

function App() {
    const [isLogin, setIsLogin] = useState(() => !!localStorage.getItem("userId"));

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2500} />
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

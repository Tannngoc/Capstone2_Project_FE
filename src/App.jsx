import { useState } from 'react'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import './App.css'
import { Box } from '@mui/material'
import Webpages from './webpages/Webpages'
import Register from './webpages/navbar/account/Register'
import Login from './webpages/navbar/account/Login'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Webpages />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

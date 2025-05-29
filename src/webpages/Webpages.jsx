import React, { useState } from 'react'
import { Box } from '@mui/material'
import Navbar from './navbar/Navbar'
import Content from './body/Content'
import { stockData } from '../APIs/demo-data'
import TradingViewWidget from './demo/TradingViewWidget'

const Webpages = ({isLogin, setIsLogin}) => {
  return (
    <Box>
        <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
        <Content stockData={stockData} isLogin={isLogin} />
        <TradingViewWidget />
    </Box>
  )
}

export default Webpages
import React from 'react'
import { Box } from '@mui/material'
import Navbar from './navbar/Navbar'
import Content from './body/Content'
import { stockData } from '../APIs/demo-data'
import TradingViewWidget from './demo/TradingViewWidget'



const Webpages = () => {
  return (
    <Box>
        <Navbar />
        <Content stockData={stockData} />
        <TradingViewWidget />
        
    </Box>
  )
}

export default Webpages
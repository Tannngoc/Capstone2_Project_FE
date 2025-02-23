import React from 'react'
import { Box } from '@mui/material'
import Navbar from './navbar/Navbar'
import Content from './body/Content'
import { stockData } from '../APIs/demo-data'



const Webpages = () => {
  return (
    <Box>
        <Navbar />
        <Content stockData={stockData} />
        
    </Box>
  )
}

export default Webpages
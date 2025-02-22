import React from 'react'
import { Box } from '@mui/material'
import Navbar from './navbar/Navbar'




const Webpages = () => {
  return (
    <Box>
        <Navbar />

        <Box sx={{
            height:'400rem'
        }}>
            <Box sx={{
                height:'200rem',
                backgroundColor:'green'
            }}></Box>

            <Box sx={{
                height:'200rem',
                backgroundColor:'gray'
            }}></Box>
        </Box>
    </Box>
  )
}

export default Webpages
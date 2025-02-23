import React from 'react'
import { Box, Typography } from '@mui/material'

const Header = ({ data }) => {
  return (
    <Box sx={{ display: 'flex', height: '100px', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'black' }}>
        {data.name}
      </Typography>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 'normal', color: 'black' }}>
        {data.subtitle}
      </Typography>
    </Box>
  )
}

export default Header
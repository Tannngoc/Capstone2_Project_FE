import { Box, Typography } from '@mui/material'
import React from 'react'

const About = ({data}) => {

  const marketCap = data.insight.marketCap/1000000000
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2rem', backgroundColor: 'white', borderRadius: '4px', margin: '2rem 0' }}>
      <Box>
        {/* title */}
        <Typography sx={{
          fontWeight:'bold',
          fontSize:'1.5rem'
        }}>
          {`About ${data.aboutName}`}
        </Typography>
      </Box>

      {/* content */}
      <Box sx={{display:'flex', gap:'3rem', marginTop:'1rem'}}>
        {/* left */}
        <Box sx={{width:'60%', display:'flex', flexDirection:'column'}}>
          {/* description */}
          <Typography>
            {data.aboutDes}
          </Typography>

          <Box sx={{display:'flex',gap:'2rem'}}>
            {/* left */}
            <Box sx={{width:'45%'}}>
              {/* sector */}
              <Box sx={{display:'flex',justifyContent:'space-between', margin:'15px 0'}}>
                <Typography sx={{fontWeight:'bold'}}>Sector</Typography>
                <Typography>Electronic Technology</Typography>
              </Box>
              {/* industry */}
              <Box sx={{display:'flex',justifyContent:'space-between', margin:'15px 0'}}>
                <Typography sx={{fontWeight:'bold'}}>Industry</Typography>
                <Typography>Semiconductors</Typography>
              </Box>
              {/* employee */}
              <Box sx={{display:'flex',justifyContent:'space-between', margin:'15px 0'}}>
                <Typography sx={{fontWeight:'bold'}}>Employees</Typography>
                <Typography>29,600</Typography>
              </Box>
              
            </Box>

            {/* right */}
            <Box sx={{width:'45%'}}>
              {/* ratio */}
              <Box sx={{display:'flex',justifyContent:'space-between', margin:'15px 0'}}>
                <Typography sx={{fontWeight:'bold'}}>P/E ratio</Typography>
                <Typography>52.95x</Typography>
              </Box>
              {/* Dividend yield */}
              <Box sx={{display:'flex',justifyContent:'space-between', margin:'15px 0'}}>
                <Typography sx={{fontWeight:'bold'}}>Dividend yield</Typography>
                <Typography>0.03%</Typography>
              </Box>
              
              
            </Box>
          </Box>
        </Box>

        {/* right */}
        <Box sx={{width:'40%'}}>
          <Typography sx={{fontWeight:'bold', fontSize:'1rem'}}>Market Cap: {`$${marketCap}B`}</Typography>
          <Typography sx={{fontStyle:'italic'}}>{data.insight.insightDes}</Typography>
          
        </Box>
       
      </Box>
      
    </Box>
  )
}

export default About
import React from 'react'
import { Box, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Quote = ({ data }) => {
  const latestMonthPrice = data.prices[Object.keys(data.prices).pop()];
  const averagePrice = Object.values(data.prices).reduce((acc, curr) => acc + curr, 0) / Object.keys(data.prices).length;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2rem', backgroundColor: 'white', borderRadius: '4px', margin: '2rem 0' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap:'3rem', marginBottom: '1rem', alignItems:'baseline' }}>
            <Box sx={{display:'flex', flexDirection:'column', }}>
                <Typography sx={{ color: 'black', fontWeight:'bold', fontSize:'2rem' }}>
                    ${latestMonthPrice}
                </Typography>
                <Typography sx={{fontStyle:'italic', opacity:'0.7'}}>Price as of latest month</Typography>
            </Box>

            <Box sx={{
                display:'flex',
            }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'black' }}>
                    ${averagePrice.toFixed(2)} <span style={{ color: averagePrice < latestMonthPrice ? 'green' : 'red' }}>{averagePrice < latestMonthPrice ? `+ ${(latestMonthPrice - averagePrice).toFixed(2)}` : `- ${(averagePrice - latestMonthPrice).toFixed(2)}`}</span>
                </Typography>
                
            </Box>
        </Box>

        
        <Box sx={{ display: 'flex', flexDirection: 'row',  width: '100%' }}>
            <Box sx={{ width: '50%' }}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                data={Object.entries(data.prices).map(([name, price]) => ({ name, price }))}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                
                <Line type="monotone" dataKey="price" stroke="#FF0000" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            </Box>
            <Box sx={{ width: '50%', }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'black', }}>
                Quote
            </Typography>
            <Typography variant="body1" component="p" sx={{ color: 'black' }}>
                {data.insight}
            </Typography>
            </Box>
        </Box>
    </Box>
  )
}

export default Quote
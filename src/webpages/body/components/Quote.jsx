import React from 'react'
import { Box, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Quote = ({ data }) => {
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
let day = currentDate.getDate();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();
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
            <Typography  sx={{ fontWeight: 'bold', color: 'black', fontSize:'1.5rem'}}>
                Quote
            </Typography>
            <Typography variant="body1" component="p" sx={{ color: 'black' }}>
                {data.insight}
            </Typography>

            <Box sx={{display: 'flex', gap:'.5rem', marginTop:'.5rem'}}>
                <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'20%'}}>
                    <Typography sx={{
                        fontWeight:'bold', 
                        fontSize:'1.5rem', 
                        color: data.stockPrices.month1.closePrice > data.stockPrices.month1.openPrice ? 'green' : 'red' 
                    }}>
                        {data.stockPrices.month1.closePrice}
                    </Typography>

                    <Typography sx={{
                        color: data.stockPrices.month1.closePrice > data.stockPrices.month1.openPrice ? 'green' : 'red'
                    }}>
                        {((data.stockPrices.month1.closePrice - data.stockPrices.month1.openPrice)/data.stockPrices.month1.openPrice*100).toFixed(3)}%
                    </Typography>

                    <Typography sx={{color: data.stockPrices.month1.closePrice > data.stockPrices.month1.openPrice ? 'green' : 'red'}}>
                        {`${year}-${month}-${day}`}
                    </Typography>
                </Box>
                
                    {/* openPrice: 178.71,
            closePrice: 178.8,
            lowestPrice: 176.55,
            highestPrice: 179.86,
            volumn: 73000000, */}
                <Box sx={{width:'80%', display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gap:'.5rem', backgroundColor: 'rgba(173, 216, 230, 0.5)', padding: 1 }}>
                    
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <Typography sx={{fontWeight:'semi-bold'}}>Volumn:</Typography>
                            <Typography sx={{
                                fontWeight:'bold'
                            }}>{data.stockPrices.month1.volumn}</Typography>
                    </Box>  
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <Typography sx={{fontWeight:'semi-bold'}}>Open price:</Typography>
                            <Typography sx={{
                                fontWeight:'bold'
                            }}>{data.stockPrices.month1.openPrice}</Typography>
                    </Box>  
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <Typography sx={{fontWeight:'semi-bold'}}>Lowest price:</Typography>
                            <Typography sx={{
                                fontWeight:'bold',
                                color: data.stockPrices.month1.lowestPrice > data.stockPrices.month1.openPrice ? 'green' : 'red'
                            }}>{data.stockPrices.month1.lowestPrice}</Typography>
                    </Box>  
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <Typography sx={{fontWeight:'semi-bold'}}>Highest price:</Typography>
                            <Typography sx={{
                                fontWeight:'bold',
                                color: data.stockPrices.month1.highestPrice > data.stockPrices.month1.openPrice ? 'green' : 'red'
                            }}>{data.stockPrices.month1.highestPrice}</Typography>
                    </Box>  
                    
                </Box>
            </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Quote
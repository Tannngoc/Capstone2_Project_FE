import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const Forecasts = ({ data }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2rem', backgroundColor: 'white', borderRadius: '4px', margin: '2rem 0' }}>
      <Typography sx={{fontSize:'2rem', fontWeight:'bold'}}>
        Forecasts
      </Typography>
      <Box sx={{margin:'1rem 0', display:'flex', gap:'2rem'}}>
        <Box sx={{display:'flex', alignItems:'center', gap:'.5rem', }}>
          <Box sx={{width:'1rem', height:'1rem', backgroundColor:'#4CAF50', borderRadius:'50%'}}></Box>
          <Typography sx={{fontWeight:'bold'}}>{`Buy: ${data.analystRating.buy}%`}</Typography>
        </Box>

        <Box sx={{display:'flex', alignItems:'center', gap:'.5rem', }}>
          <Box sx={{width:'1rem', height:'1rem', backgroundColor:'#8b866d', borderRadius:'50%'}}></Box>
          <Typography sx={{fontWeight:'bold'}}>{`Hold: ${data.analystRating.hold}%`}</Typography>
        </Box>

        <Box sx={{display:'flex', alignItems:'center', gap:'.5rem', }}>
          <Box sx={{width:'1rem', height:'1rem', backgroundColor:'#FF0000', borderRadius:'50%'}}></Box>
          <Typography sx={{fontWeight:'bold'}}>{`Sell: ${data.analystRating.sell}%`}</Typography>
        </Box>
      </Box>
      <PieChart width={400} height={400}>
        <Pie
          data={Object.entries(data.analystRating).map(([key, value]) => ({ name: key, value }))}
          cx={200}
          cy={200}
          outerRadius={180} // Increased outerRadius to make the pie chart larger
          innerRadius={120} // Adjusted innerRadius to maintain the donut shape with the larger size
          fill="#8884d8"
          dataKey="value"
        >
          {Object.entries(data.analystRating).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={ entry[0] === 'hold' ? '#8b866d' : entry[0] === 'buy' ? '#4CAF50' : entry[0] === 'sell' ? '#FF0000' : '#000000'} />
          ))}
        </Pie>
      </PieChart>
    </Box>
  );
};

export default Forecasts;
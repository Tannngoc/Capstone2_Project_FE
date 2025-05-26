// import { Box, Typography } from '@mui/material';
// import React from 'react'

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const Financials = ( {data}) => {
//   const financialData = Object.entries(data.totalRevenue).map(([year, revenue]) => ({
//     year,
//     revenue,
//     netIncome: data.netIncome[year],
//   }));

//   return (
//     <Box sx={{display: 'flex', flexDirection: 'column', padding: '2rem', backgroundColor: 'white', borderRadius: '4px', margin: '2rem 0' }}>
//       <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',  }}>
//         <Box sx={{ width: '60%' }}>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart
//               data={financialData}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <XAxis dataKey="year" />
//               <YAxis />
//               <CartesianGrid strokeDasharray="3 3" />
//               <Tooltip />
              
//               <Bar dataKey="revenue" fill="#3464f2" barSize={40} /> 
//               <Bar dataKey="netIncome" fill="#f0b205" barSize={40} /> 
//             </BarChart>
//           </ResponsiveContainer>
//         </Box>
//         <Box sx={{ width: '40%', padding: '20px',  }}>
//             <Typography sx={{ fontWeight: 'bold', color: 'black', fontSize:'1.5rem' }}>
//               Financial
//             </Typography>
//             <Typography variant="body1" component="p" sx={{ color: 'black' }}>
//               {data.insight}
//             </Typography>
//         </Box>
//       </Box>
//     </Box>
//   )
// }

// export default Financials
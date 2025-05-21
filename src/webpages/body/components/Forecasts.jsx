import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider } from '@mui/material';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const Forecasts = ({ data }) => {
  const [openBuy, setOpenBuy] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleOpenBuy = () => { setOpenBuy(true); setQuantity(1); };
  const handleCloseBuy = () => setOpenBuy(false);

  const handleOpenSell = () => { setOpenSell(true); setQuantity(1); };
  const handleCloseSell = () => setOpenSell(false);

  const handleQuantityChange = (e) => {
    const val = Math.max(1, Number(e.target.value));
    setQuantity(val);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2rem', backgroundColor: 'white', borderRadius: '4px', margin: '2rem 0' }}>
      <Typography sx={{fontSize:'2rem', fontWeight:'bold'}}>
        Forecasts
      </Typography>
      <Box sx={{display:'flex', gap:'2rem'}}>
        <Box sx={{width:'50%'}}>
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

        <Box sx={{display:'flex', flexDirection:'column', width:'50%'}}>
              <Box sx={{padding:'1rem', width:'100%', borderBottom:'1px solid black'}}>
                <Box sx={{fontWeight:'bold', fontSize:'1.3rem'}} >
                  {data.name}
                </Box>

                <Box sx={{display:'flex', gap:'1rem'}}>
                  <Box sx={{display:'flex', gap:'1rem'}}>
                    <Typography sx={{color:'#8b866d'}}>NSE</Typography>
                    <Typography sx={{color:'green'}}>395.22$</Typography>
                  </Box>

                  <Box sx={{display:'flex'}}>
                    <Typography sx={{color:'#8b866d'}}>+38.95</Typography>
                    <Typography sx={{color:'#8b866d'}}>(11.2%)</Typography>
                  </Box>
                </Box>
                
              </Box>

              <Box sx={{width:'100%', display:'flex',gap:'2rem', alignItems:'center', justifyContent:'center', padding:'1rem'}}>
                <Button
                  sx={{border:'1px solid red', color:'red', fontSize:'1.3rem', padding:'.5rem 4rem'}}
                  onClick={handleOpenBuy}
                >
                  Buy
                </Button>
                <Button
                  sx={{border:'1px solid red', color:'white',backgroundColor:'red', fontSize:'1.3rem', padding:'.5rem 4rem'}}
                  onClick={handleOpenSell}
                >
                  Sell
                </Button>

              </Box>
        </Box>

      </Box>
      <Dialog open={openBuy} onClose={handleCloseBuy} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
          background: 'linear-gradient(90deg, #4CAF50 0%, #8b866d 100%)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.5rem'
        }}>
          Buy {data.name}
        </DialogTitle>
        <DialogContent sx={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: 2}}>
          <Typography variant="subtitle1" sx={{mb: 2, color: '#555'}}>
            Price: <span style={{color: '#4CAF50', fontWeight: 600}}>{data.price}$</span>
          </Typography>
          <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              sx={{flex: 1}}
              inputProps={{min: 1}}
            />
            <TextField
              label="Total"
              value={`${(quantity * data.price).toFixed(2)} $`}
              InputProps={{readOnly: true}}
              sx={{flex: 1}}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{padding: '1.5rem', justifyContent: 'space-between', background: '#f9f9f9'}}>
          <Button onClick={handleCloseBuy} sx={{borderRadius: 2, color: '#8b866d'}}>Cancel</Button>
          <Button variant="contained" sx={{
            background: 'linear-gradient(90deg, #4CAF50 0%, #8b866d 100%)',
            color: 'white',
            borderRadius: 2,
            fontWeight: 'bold',
            px: 4
          }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSell} onClose={handleCloseSell} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
          background: 'linear-gradient(90deg, #FF0000 0%, #8b866d 100%)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.5rem'
        }}>
          Sell {data.name}
        </DialogTitle>
        <DialogContent sx={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: 2}}>
          <Typography variant="subtitle1" sx={{mb: 2, color: '#555'}}>
            Price: <span style={{color: '#FF0000', fontWeight: 600}}>{data.price}$</span>
          </Typography>
          <Typography variant="body2" sx={{mb: 2, color: '#8b866d'}}>
            Stocks Own: <span style={{fontWeight: 600}}>{data.userStock || 0}</span>
          </Typography>
          <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              sx={{flex: 1}}
              inputProps={{min: 1, max: data.userStock || 0}}
            />
            <TextField
              label="Total"
              value={`${(quantity * data.price).toFixed(2)} $`}
              InputProps={{readOnly: true}}
              sx={{flex: 1}}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{padding: '1.5rem', justifyContent: 'space-between', background: '#f9f9f9'}}>
          <Button onClick={handleCloseSell} sx={{borderRadius: 2, color: '#8b866d'}}>Cancel</Button>
          <Button variant="contained" sx={{
            background: 'linear-gradient(90deg, #FF0000 0%, #8b866d 100%)',
            color: 'white',
            borderRadius: 2,
            fontWeight: 'bold',
            px: 4
          }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Forecasts;
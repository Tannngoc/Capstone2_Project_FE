import React, { useState } from 'react'
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material'

const News = ({ data }) => {
  const [mode, setMode] = useState('tipsrank')

  const handleModeChange = (event, newMode) => {
    setMode(newMode)
  }

  // Kiểm tra data có undefined không, nếu có thì render thông báo hoặc loading
  if (!data || typeof data !== 'object') {
    return (
      <Box sx={{ padding: '2rem', backgroundColor: 'white', borderRadius: '4px', margin: '2rem 0', textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          News data is unavailable.
        </Typography>
      </Box>
    );
  }

  // Kiểm tra data[mode] có undefined không
  const newsList = data[mode];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem', backgroundColor: 'white', borderRadius: '4px', margin: '2rem 0' }}>
      <Box sx={{ display: 'flex', gap: '.5rem' }}>
        <Button
          sx={{
            color: mode === 'tipsrank' ? 'red' : 'black',
            border: mode === 'tipsrank' ? '2px solid red' : '2px solid black'
          }}
          onClick={() => handleModeChange(null, 'tipsrank')}
        >
          TipRanks
        </Button>
        <Button
          sx={{
            color: mode === 'release' ? 'red' : 'black',
            border: mode === 'release' ? '2px solid red' : '2px solid black'
          }}
          onClick={() => handleModeChange(null, 'release')}
        >
          Release
        </Button>
      </Box>
      <Typography sx={{ marginTop: '1rem', fontWeight: 'bold' }} variant="h5" component="h2" gutterBottom>
        {mode.charAt(0).toUpperCase() + mode.slice(1)} News
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* left */}
        <Box sx={{ width: '30%' }}>
          <img style={{ objectFit: 'contain', width: '100%' }} src="./news.jpg" alt="" />
        </Box>

        {/* right */}
        <List style={{ overflowY: 'auto', maxHeight: '250px', width: '70%' }}>
          {Array.isArray(newsList) && newsList.length > 0 ? (
            newsList.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  sx={{ borderBottom: '1px solid #9f9f9f', opacity: '.8' }}
                  primary={`${item.day} at ${item.time} - ${item.description}`}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary="No news available for this category."
                sx={{ opacity: 0.7 }}
              />
            </ListItem>
          )}
        </List>
      </Box>
    </div>
  )
}

export default News
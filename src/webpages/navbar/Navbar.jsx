import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItemStyle = {
    fontWeight: 'bold',
    color: 'black', 
    fontSize: '1.2rem',
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: -2,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'black'
      }
    }
  }

  const tabStyle = (tab) => ({
    color: activeTab === tab ? '#000000' : '#666666',
    cursor: 'pointer',
    fontWeight: activeTab === tab ? 'bold' : 'normal',
    textDecoration: activeTab === tab ? 'underline' : 'none',
    textDecorationColor: activeTab === tab ? 'red' : 'transparent'
  })

  return (
    <Box sx={{
      width:'100vw', 
      display:'flex', 
      flexDirection:'column', 
      justifyContent:'center', 
      alignItems:'center',
      position: 'fixed',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1000,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
        {/*nav tren */}
        <Box sx={{
            display:'flex',
            width:'90vw',
            marginTop:'.5rem',
            justifyContent:'space-between',
            borderBottom:'2px solid black',
            alignItems:'center',
        }}>
            {/* trai */}
            <Box sx={{display:'flex', gap:'2rem', alignItems:'center'}}>
                <Box sx={{display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer'}}>
                    <Box sx={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'red',
                        borderRadius: '50%'
                    }}/>
                    <Typography sx={{fontWeight:'bold', color:'black', fontSize:'2rem'}}>C2SE</Typography>
                </Box>

                <Box sx={navItemStyle}>Markets</Box>
                <Box sx={navItemStyle}>Tech</Box>
                <Box sx={navItemStyle}>Media</Box>
            </Box>

            {/* phai */}
            <Box sx={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                <Box sx={{display:'flex', alignItems:'center'}}>
                    {isSearchOpen ? (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#f5f5f5',
                            padding: '0.5rem',
                            borderRadius: '4px'
                        }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    backgroundColor: 'transparent',
                                    fontSize: '1rem',
                                    width: '200px'
                                }}
                                autoFocus
                                onBlur={() => setIsSearchOpen(false)}
                            />
                            <SearchIcon sx={{
                                fontSize:'1.8rem',
                                cursor: 'pointer',
                                '&:hover': {opacity: 0.7}
                            }} />
                        </Box>
                    ) : (
                        <SearchIcon 
                            onClick={() => setIsSearchOpen(true)}
                            sx={{
                                fontSize:'1.8rem',
                                cursor: 'pointer',
                                '&:hover': {opacity: 0.7}
                            }} 
                        />
                    )}
                </Box>

                {/* sign in */}
                <Box sx={{paddingBottom:'0.2rem'}}>
                    <Button variant="text" sx={{
                        fontWeight:'bold',
                        color:'black',
                        fontSize:'1.2rem',
                        cursor:'pointer',
                        padding:'0.2rem .5rem',
                        '&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'}
                    }}>Sign in</Button>
                </Box>
            </Box>
        </Box>

        {/* nav duoi */}
        <Box>
            <Box sx={{
                display:'flex',
                width:'90vw',
                marginTop:'.5rem',
                justifyContent:'end',
                alignItems:'center',
                gap: '1.5rem'
            }}>
                <Box onClick={() => setActiveTab('quote')} sx={tabStyle('quote')}>Quote</Box>
                <Box onClick={() => setActiveTab('about')} sx={tabStyle('about')}>About</Box>
                <Box onClick={() => setActiveTab('financials')} sx={tabStyle('financials')}>Financials</Box>
                <Box onClick={() => setActiveTab('forecasts')} sx={tabStyle('forecasts')}>Forecasts</Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Navbar
import React, { useState } from 'react'
import { Box,Button,Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const Login = ({setIsLogin}) => {

    
  return (
    <Box sx={{width:'100vw', height:'100vh', backgroundColor:'gray'}}>
        
            <Box sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '4px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                zIndex: 1001, // Ensure the modal is above the backdrop
                
            }}>
                
                <Typography sx={{fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '2rem'}}>Login</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                    <input
                        type="text"
                        placeholder="Username"
                        style={{
                            border: '1px solid gray',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            width: '100%',
                            fontSize: '1.1rem'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={{
                            border: '1px solid gray',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            width: '100%',
                            fontSize: '1.1rem'
                        }}
                    />
                    <Typography sx={{color:'red', fontStyle:'italic'}}>Username or Password is wrong!</Typography>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button onClick={()=>{setIsLogin(true)}}  sx={{backgroundColor: 'white', border:'2px solid red', color:'black', fontWeight:'bold' ,padding: '0.75rem 2rem'}}>
                        
                        <Link style={{textDecoration:'none', color:'red'}} to={'/'}>Sign in</Link>
                    </Button>
                    <Link to={'/register'}>
                        <Button variant="text" sx={{color: 'red',fontWeight:'bold' ,fontSize: '1.1rem'}}>Register</Button>  
                    </Link>
                    </Box>
                </Box>
            </Box>
        
    </Box>
    
  )
}

export default Login
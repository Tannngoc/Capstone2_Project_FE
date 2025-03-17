import React, { useState } from 'react'
import { Box,Button,Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', {username, password})
        .then(result => {
            console.log(result);
            if(result.data === 'Success') {
                
                navigate('/')
            }
        })
        .catch(err => console.error(err));
    }
    
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
                    <form onSubmit={handleSubmit}>
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
                           
                            onChange={(e) => setUsername(e.target.value)}
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
                            
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Typography sx={{color:'red', fontStyle:'italic'}}>Username or Password is wrong!</Typography>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Button  sx={{backgroundColor: 'white', border:'2px solid red', color:'black', fontWeight:'bold' ,padding: '0.75rem 2rem'}} type="submit">
                                Sign in
                            </Button>
                            <Link to={'/register'}>
                                <Button variant="text" sx={{color: 'red',fontWeight:'bold' ,fontSize: '1.1rem'}}>Register</Button>  
                            </Link>
                        </Box>
                    </form>
                </Box>
            </Box>
        
    </Box>
    
  )
}

export default Login
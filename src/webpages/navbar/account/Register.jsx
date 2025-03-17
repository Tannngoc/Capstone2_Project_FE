import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    axios.post('http://localhost:3001/register', { username, email, password, confirmPassword })
      .then(result => {
        console.log(result);
        navigate('/login')
      })
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', backgroundColor: 'gray' }}>
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
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '2rem' }}>Register</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              style={{
                border: '1px solid gray',
                padding: '0.75rem',
                borderRadius: '4px',
                width: '100%',
                fontSize: '1.1rem',
              }}
           
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              style={{
                border: '1px solid gray',
                padding: '0.75rem',
                borderRadius: '4px',
                width: '100%',
                fontSize: '1.1rem'
              }}
           
              onChange={(e) => setEmail(e.target.value)}
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
            <input
              type="password"
              placeholder="Confirm Password"
              style={{
                border: '1px solid gray',
                padding: '0.75rem',
                borderRadius: '4px',
                width: '100%',
                fontSize: '1.1rem'
              }}
            
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Typography sx={{ color: 'red', fontStyle: 'italic' }}>Already have account!</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button sx={{ backgroundColor: 'white', border: '2px solid red', color: 'black', fontWeight: 'bold', padding: '0.75rem 2rem' }} type="submit">
                Register
              </Button>
              <Link to={'/login'}>
                <Button variant="text" sx={{ color: 'red', fontWeight: 'bold', fontSize: '1.1rem' }}>Login</Button>
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
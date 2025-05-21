import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/register', {
        username,
        email,
        password
      });

      console.log('Register success:', response.data);
      setMessage('');
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error);
      setMessage(error.response?.data?.message || 'Registration failed');
    }
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
        zIndex: 1001
      }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '2rem' }}>
          Register
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              style={inputStyle}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              style={inputStyle}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              style={inputStyle}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {message && (
              <Typography sx={{ color: 'red', fontStyle: 'italic' }}>
                {message}
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                sx={{
                  backgroundColor: 'white',
                  border: '2px solid red',
                  color: 'black',
                  fontWeight: 'bold',
                  padding: '0.75rem 2rem'
                }}
                type="submit"
              >
                Register
              </Button>
              <Link to="/login">
                <Button
                  variant="text"
                  sx={{ color: 'red', fontWeight: 'bold', fontSize: '1.1rem' }}
                >
                  Login
                </Button>
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

const inputStyle = {
  border: '1px solid gray',
  padding: '0.75rem',
  borderRadius: '4px',
  width: '100%',
  fontSize: '1.1rem'
};

export default Register;

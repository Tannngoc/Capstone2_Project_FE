import { Box,Button,Typography } from '@mui/material';
import React from 'react'

const Register = ({setShowLoginModal, setShowRegisterForm, showLoginModal, showRegisterForm,isLogin, setIsLogin}) => {
    const handleLoginModal = () => {
        setShowLoginModal(!showLoginModal)
        setShowRegisterForm(false)
    };
      const handleRegisterForm = () => {
        setShowRegisterForm(!showRegisterForm)
        setShowLoginModal(false)
    };
  return (
    <Box>
        {showRegisterForm && (
            <Box sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '4px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                zIndex: 1001 // Ensure the modal is above the backdrop
            }}>
                <Button variant="text" sx={{color: 'red', fontSize: '1.1rem', position: 'absolute', top: '0', right: '0', margin: '1rem'}} onClick={handleRegisterForm}>X</Button>
                <Typography sx={{fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '2rem'}}>Register</Typography>
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
                        type="email"
                        placeholder="Email"
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
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Button onClick={()=>{
                            setIsLogin(true)
                            handleRegisterForm()
                        }}  sx={{backgroundColor: 'white', border:'2px solid red', color:'black', fontWeight:'bold' ,padding: '0.75rem 2rem'}}>Register</Button>
                        <Button variant="text" sx={{color: 'red',fontWeight:'bold' ,fontSize: '1.1rem'}} onClick={handleLoginModal}>Login</Button>
                    </Box>
                </Box>
            </Box>
        )}
    </Box>
  )
}

export default Register
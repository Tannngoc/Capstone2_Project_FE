import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'


const ManageUser = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: ''
  })
  const [dataList, setDataList] = useState([])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("http://localhost:3001/v1/auth/testregister", formData)
    console.log(data)
    handleClose()
  }

  const fetchData = async () => {
    const data = await axios.get('http://localhost:3001/v1/user/')
    setDataList(data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(dataList)

  return (
    <Box sx={{bgcolor:'#f0f0f0', width:'100vw', height:'100vh', borderRadius: '10px'}}>
      <Typography sx={{color:'red', fontWeight:'bold', padding:'1rem'}} variant="h4" component="h1" gutterBottom>Manage Users</Typography>
      <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
        <Button sx={{margin:'1rem'}} variant="contained" color="primary" onClick={handleOpen}>Add User</Button>
      </Box>
      <TableContainer component={Paper} sx={{maxWidth: '95%', margin: 'auto', overflowY: 'auto', height:'50vh'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}}>Username</TableCell>
              <TableCell align="right" sx={{fontWeight: 'bold'}}>Password</TableCell>
              <TableCell align="right" sx={{fontWeight: 'bold'}}>Email</TableCell>
              <TableCell align="right" sx={{fontWeight: 'bold'}}>Role</TableCell>
              <TableCell align="right" sx={{fontWeight: 'bold'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((user) => (
              <TableRow  key={user.id}>
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell align="right">{user.password}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.role ? 'Admin' : 'User'}</TableCell>
                <TableCell align="right">
                  <Button  variant="contained" color="primary" size="small">Update</Button>
                  <Button variant="contained" color="error" size="small" sx={{marginLeft: '10px'}}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width:'35vw' }}>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              id="confirm-password"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              id="role"
              label="Role"
              type="text"
              fullWidth
              variant="standard"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!formData.username || !formData.password || !formData.email || !formData.role || formData.password !== formData.confirmPassword}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ManageUser
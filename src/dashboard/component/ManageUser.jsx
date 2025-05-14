import { 
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Typography, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions 
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { red } from '@mui/material/colors';

const ManageUser = () => {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: Boolean
  })

  const [formDataEdit, setFormDataEdit] = useState({
    id: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: Boolean
  })

  const [dataList, setDataList] = useState([])

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setFormData({ username: '', password: '', confirmPassword: '', email: '', role: '' })
  }

  const handleEditOpen = (user) => {
    setEdit(true);
    setFormDataEdit(user);
  };

  const handleEditClose = () => {
    setEdit(false);
    setFormDataEdit({ id: '', username: '', password: '', confirmPassword: '', email: '', role: '' });
  };

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3001/v1/auth/testregister", formData)
    fetchData()
    handleClose()
  }

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/v1/user/')
    setDataList(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/delete/${id}`)
    fetchData()
  }

  const handleEditOnChange = (e) => {
    setFormDataEdit(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    await axios.put('http://localhost:3001/update', formDataEdit)
    fetchData()
    handleEditClose()
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
      <Typography sx={{ fontWeight: 'bold', mb: 2 }} variant="h4">Manage Users</Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2, backgroundColor:'red' }}>Add User</Button>

      <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto', maxHeight: '60vh' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Password</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell align="right">{user.password}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.role ? 'Admin' : 'User'}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEditOpen(user)} variant="contained" color="primary" size="small">Update</Button>
                  <Button onClick={() => handleDelete(user._id)} variant="contained" color="error" size="small" sx={{ ml: 1 }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add User Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>Add User</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '30vw' , padding: '10px' }}>
            <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required />
            <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
            <TextField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <TextField label="Role" name="role" value={formData.role} onChange={handleChange} required />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!formData.username || !formData.password || !formData.email || !formData.role || formData.password !== formData.confirmPassword}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={edit} onClose={handleEditClose}>
        <DialogTitle>
          <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>Edit User</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '30vw' }}>
            <TextField label="Username" name="username" value={formDataEdit.username} onChange={handleEditOnChange} required />
            <TextField label="Password" type="password" name="password" value={formDataEdit.password} onChange={handleEditOnChange} required />
            <TextField label="Confirm Password" type="password" name="confirmPassword" value={formDataEdit.confirmPassword} onChange={handleEditOnChange} required />
            <TextField label="Email" type="email" name="email" value={formDataEdit.email} onChange={handleEditOnChange} required />
            <TextField label="Role" name="role" value={formDataEdit.role} onChange={handleEditOnChange} required />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={!formDataEdit.username || !formDataEdit.password || !formDataEdit.email || !formDataEdit.role || formDataEdit.password !== formDataEdit.confirmPassword}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUser;
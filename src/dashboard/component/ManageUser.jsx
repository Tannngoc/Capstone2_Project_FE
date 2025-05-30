import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageUser = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    id: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [dataList, setDataList] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = (user) => {
    setEdit(true);
    setFormDataEdit(user);
  };
  const handleEditClose = () => setEdit(false);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:5000/api/auth/register", formData);
    fetchData();
    handleClose();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/user/users");
      setDataList(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/user/users/${id}`);
      fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const handleEditOnChange = (e) => {
    setFormDataEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/user/users/${formDataEdit.id}`,
        {
          username: formDataEdit.username,
          email: formDataEdit.email,
          role: formDataEdit.role,
        }
      );
      fetchData();
      handleEditClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: "white",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Typography sx={{ fontWeight: "bold", mb: 2 }} variant="h4">
        Manage Users
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ mb: 2, backgroundColor: "red" }}
      >
        Add User
      </Button>

      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflow: "auto", maxHeight: "60vh" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Created at
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Update at
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.created_at || "-"}</TableCell>
                <TableCell align="right">{user.updated_at || "-"}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEditOpen(user)}
                    sx={{ minWidth: 0, mr: 1 }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                    sx={{ minWidth: 0 }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add User Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
            Add User
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "30vw",
              padding: "10px",
            }}
          >
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !formData.username ||
              !formData.password ||
              !formData.email ||
              !formData.role ||
              formData.password !== formData.confirmPassword
            }
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={edit} onClose={handleEditClose}>
        <DialogTitle>
          <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
            Edit User
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "30vw",
            }}
          >
            <TextField
              label="Username"
              name="username"
              value={formDataEdit.username}
              onChange={handleEditOnChange}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formDataEdit.password}
              onChange={handleEditOnChange}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formDataEdit.confirmPassword}
              onChange={handleEditOnChange}
              required
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formDataEdit.email}
              onChange={handleEditOnChange}
              required
            />
            <TextField
              label="Role"
              name="role"
              value={formDataEdit.role}
              onChange={handleEditOnChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={handleUpdate}
            disabled={
              !formDataEdit.username ||
              !formDataEdit.password ||
              !formDataEdit.email ||
              !formDataEdit.role ||
              formDataEdit.password !== formDataEdit.confirmPassword
            }
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUser;

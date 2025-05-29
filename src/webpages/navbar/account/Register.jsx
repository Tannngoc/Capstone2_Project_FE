import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Register = ({ setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      setMessage("");
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          position: "relative", // Để đặt nút close
          padding: { xs: "2rem", sm: "3rem 4rem" },
          borderRadius: "18px",
          minWidth: { xs: "90vw", sm: "400px" },
          maxWidth: "95vw",
          background: "white",
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            minWidth: 0,
            padding: 0.5,
            color: "#888",
            zIndex: 2,
            "&:hover": { color: "red", background: "transparent" },
          }}
        >
          <CloseIcon />
        </Button>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: "red",
            textAlign: "center",
            mb: 3,
            letterSpacing: 1,
          }}
        >
          Register
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
            required
          />
          {message && (
            <Typography
              sx={{ color: "red", fontStyle: "italic", textAlign: "center" }}
            >
              {message}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #ff1744 0%, #ff8a65 100%)",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: "8px",
              py: 1.2,
              boxShadow: 2,
              transition: "0.2s",
              "&:hover": {
                background: "linear-gradient(90deg, #d50000 0%, #ff7043 100%)",
                boxShadow: 4,
              },
            }}
            fullWidth
          >
            Register
          </Button>
          <Typography sx={{ textAlign: "center", mt: 1 }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#ff1744",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;

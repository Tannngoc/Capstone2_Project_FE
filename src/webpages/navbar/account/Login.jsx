import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";

const Login = ({ isLogin, setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [message, setMessage] = useState();

  const handleSubmit1 = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/v1/auth/testlogin", { username, password })
      .then((result) => {
        if (
          result.data === "The password is incorrect" ||
          result.data === "No existed username"
        ) {
          setMessage(result.data);
          toast.error(result.data, { autoClose: 1200 });
          
          setTimeout(() => {
          }, 1200);
        } else {
          setIsLogin(true);
          setAccessToken(result.data.access_token);
          const decoded = jwtDecode(result.data.access_token);
          const userId = decoded.sub;
          localStorage.setItem("userId", userId);
          localStorage.setItem("accessToken", result.data.access_token);
          toast.success("Login successful!", { autoClose: 1200 });
          setTimeout(() => {
            navigate("/");
          }, 1200);
        }
      })
      .catch(() => {
        toast.error("Login failed. Please try again!", { autoClose: 1200 });
      });
  };

  const handleShowPassword = (event) => {
    setShowPassword(event.target.checked);
  };

  const handleForgotPassword = () => {
    toast.info(
      "Please contact admin or check your email for password reset instructions.",
      { autoClose: 3500 }
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
        {/* Nút đóng */}
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
          Sign In
        </Typography>
        <form
          onSubmit={handleSubmit1}
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
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword((show) => !show)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setShowPassword((show) => !show);
                    }}
                    aria-label={
                      showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"
                    }
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                </InputAdornment>
              ),
            }}
          />
          <MuiLink
            component="button"
            type="button"
            onClick={handleForgotPassword}
            sx={{
              color: "#ff1744",
              fontWeight: "bold",
              textAlign: "center",
              mb: 1,
              alignSelf: "flex-end",
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Quên mật khẩu?
          </MuiLink>
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
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center", mt: 1 }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#ff1744",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;

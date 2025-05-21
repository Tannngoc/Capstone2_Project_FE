import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountMenu from "./account/AccountMenu";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLogin, setIsLogin }) => {
  const [activeTab, setActiveTab] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();

  const navItemStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "1.2rem",
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.7,
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: -2,
        left: 0,
        width: "100%",
        height: "2px",
        backgroundColor: "black",
      },
    },
  };

  const tabStyle = (tab) => ({
    color: activeTab === tab ? "#000000" : "#666666",
    cursor: "pointer",
    fontWeight: activeTab === tab ? "bold" : "normal",
    textDecoration: activeTab === tab ? "underline" : "none",
    textDecorationColor: activeTab === tab ? "red" : "transparent",
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "News") {
      navigate("/news");
    }
  };

  return (
<<<<<<< HEAD
    <Box sx={{
      width:'100vw', 
      display:'flex', 
      flexDirection:'column', 
      justifyContent:'center', 
      alignItems:'center',
      position: 'fixed',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1000,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      maxHeight: '90px'
    }}>
        {/*nav tren */}
        <Box sx={{
            display:'flex',
            width:'90vw',
            marginTop:'.5rem',
            justifyContent:'space-between',
            borderBottom:'2px solid black',
            alignItems:'center',
        }}>
            {/* trai */}
            <Box sx={{display:'flex', gap:'2rem', alignItems:'center'}}>
                <Box sx={{display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer'}}>
                    <Box sx={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'red',
                        borderRadius: '50%'
                    }}/>
                    <Typography sx={{fontWeight:'bold', color:'black', fontSize:'2rem'}}>
                        Hubble
                    </Typography>
                </Box>
                <Link style={{textDecoration:'none'}} to={"/market"}>
                    <Box sx={navItemStyle}>Markets</Box>
                
                </Link>
                <Box sx={navItemStyle}>Tech</Box>
                
            </Box>

            {/* phai */}
            <Box sx={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                <Box sx={{display:'flex', alignItems:'center'}}>
                    {isSearchOpen ? (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#f5f5f5',
                            padding: '0.5rem',
                            borderRadius: '4px'
                        }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    backgroundColor: 'transparent',
                                    fontSize: '1rem',
                                    width: '200px'
                                }}
                                autoFocus
                                onBlur={() => setIsSearchOpen(false)}
                            />
                            <SearchIcon sx={{
                                fontSize:'1.8rem',
                                cursor: 'pointer',
                                '&:hover': {opacity: 0.7}
                            }} />
                        </Box>
                    ) : (
                        <SearchIcon 
                            onClick={() => setIsSearchOpen(true)}
                            sx={{
                                fontSize:'1.8rem',
                                cursor: 'pointer',
                                '&:hover': {opacity: 0.7}
                            }} 
                        />
                    )}
                </Box>

                {/* sign in */}
                <Box sx={{paddingBottom:'0.2rem'}}>
                    {isLogin ? <AccountMenu isLogin={isLogin} setIsLogin={setIsLogin}/> : 
                    <Box > 
                        <Link style={{textDecoration:'none', fontWeight:'bold', color:'black', fontSize:'1.5rem'}} to='/login'>
                            Sign in
                            
                        </Link>
                    </Box>}
                </Box>

                
                
            </Box>
=======
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        backgroundColor: "white",
        zIndex: 1000,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        maxHeight: "90px",
      }}
    >
      {/*nav tren */}
      <Box
        sx={{
          display: "flex",
          width: "90vw",
          marginTop: ".5rem",
          justifyContent: "space-between",
          borderBottom: "2px solid black",
          alignItems: "center",
        }}
      >
        {/* trai */}
        <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: "20px",
                height: "20px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            />
            <Typography
              sx={{ fontWeight: "bold", color: "black", fontSize: "2rem" }}
            >
              Hubble
            </Typography>
          </Box>

          <Box sx={navItemStyle}>Markets</Box>
          <Box sx={navItemStyle}>Tech</Box>
>>>>>>> c670fe4fb799978bc34d501d50b3497d78016603
        </Box>

        {/* phai */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isSearchOpen ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  padding: "0.5rem",
                  borderRadius: "4px",
                }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    fontSize: "1rem",
                    width: "200px",
                  }}
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <SearchIcon
                  sx={{
                    fontSize: "1.8rem",
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                  }}
                />
              </Box>
            ) : (
              <SearchIcon
                onClick={() => setIsSearchOpen(true)}
                sx={{
                  fontSize: "1.8rem",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.7 },
                }}
              />
            )}
          </Box>

          {/* sign in */}
          <Box sx={{ paddingBottom: "0.2rem" }}>
            {isLogin ? (
              <AccountMenu isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Box>
                <Link
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "black",
                    fontSize: "1.5rem",
                  }}
                  to="/login"
                >
                  Sign in
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* nav duoi */}
      <Box>
        <Box
          sx={{
            display: "flex",
            width: "90vw",
            marginTop: ".5rem",
            justifyContent: "end",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <Box onClick={() => handleTabClick("News")} sx={tabStyle("News")}>
            News
          </Box>
          <Box onClick={() => handleTabClick("about")} sx={tabStyle("about")}>
            About
          </Box>
          <Box
            onClick={() => handleTabClick("financials")}
            sx={tabStyle("financials")}
          >
            Financials
          </Box>
          <Box
            onClick={() => handleTabClick("forecasts")}
            sx={tabStyle("forecasts")}
          >
            Forecasts
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;

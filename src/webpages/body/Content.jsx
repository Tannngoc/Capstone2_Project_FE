import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "./components/Header";
import Quote from "./components/Quote";
import About from "./components/About";
// import Financials from "./components/Financials";
// import Forecasts from "./components/Forecasts";
// import Chatbot from "./components/Chatbot";
import News from "./components/News";
import HandleChart from "./HandleChart";
import { Market } from "../markets/Market";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";


const companies = ["AAPL", "MSFT", "IBM", "NVDA", "TSLA"];

const Content = ({ isLogin }) => {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const userId = localStorage.getItem("userId");

  return (
    <Box
      sx={{
        marginTop: "90px",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F7FAFC",
      }}
    >
      <Box sx={{ width: "90vw" }}>
        {/* Company Buttons */}
        <Box sx={{ display: "flex", gap: "1rem", padding: "1rem" }}>
          {companies.map((symbol) => (
            <Button
              key={symbol}
              variant={selectedCompany === symbol ? "contained" : "outlined"}
              onClick={() => setSelectedCompany(symbol)}
              sx={{
                fontWeight: "bold",
                minWidth: "120px",
                color: selectedCompany === symbol ? "white" : "black",
                backgroundColor:
                  selectedCompany === symbol ? "red" : "transparent",
                borderColor: "red",
                "&:hover": {
                  backgroundColor:
                    selectedCompany === symbol
                      ? "#d32f2f"
                      : "rgba(255, 0, 0, 0.04)",
                  borderColor: "red",
                },
              }}
            >
              {symbol}
            </Button>
          ))}
        </Box>

        {/* Stock Information */}
        <ToastContainer position="top-right" autoClose={2500} />
        <Header symbol={selectedCompany} />
        <HandleChart selectedCompany={selectedCompany} />
        <About selectedCompany={selectedCompany} />
        <Quote selectedCompany={selectedCompany} isLogin={isLogin} userId={userId} />
        {/* <News data={...} /> */}
        {/* <Financials data={...} /> */}
        {/* <Forecasts data={...} /> */}
        {/* <Chatbot showChat={showChat} setShowChat={setShowChat} /> */}
        <Market/>
      </Box>

      {/* footer */}
      <Box sx={{width:"100vw", maxHeight:'auto', backgroundColor:"black"}}>
        <Box sx={{maxWidth:"90vw", mx:'auto', padding:'1rem 0'}}>
          {/* left */}
          <Box sx={{ display: "flex",justifyContent:'space-between' ,alignItems: "center", gap: "0.5rem", borderTop:'1px solid whitesmoke',borderBottom:'1px solid whitesmoke' }}>
            {/* left */}
            <Box sx={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                <Box
                        sx={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "red",
                          borderRadius: "50%",
                          cursor:'pointer' 
                        }}
                />
                <Typography sx={{ fontWeight: "bold",cursor:'pointer' ,color: "white", fontSize: "2rem" }}>
                        <Link style={{color:"white", textDecoration:'none'}} to="/">Hubble</Link>
                </Typography>

            </Box>

            {/* right */}
            <Box>
              <Box sx={{display:"flex", gap:'.5rem', alignItems:"center"}}>
                <Typography sx={{color:"white", fontWeight:'bold', fontSize:'1.3rem', paddingRight:'1rem'}}>C2SE.28</Typography>
                <Box sx={{display:'flex', gap:"1rem", alignItems:"center",borderLeft:"2px solid whitesmoke",paddingLeft:'1.5rem'}}>
                  <FacebookIcon sx={{color:'white', fontSize:'1.5rem', cursor:'pointer'}}/>
                  <YouTubeIcon sx={{color:'white', fontSize:'1.5rem', cursor:'pointer'}} />
                  <MailIcon sx={{color:'white', fontSize:'1.5rem', cursor:'pointer'}} />
                  <TwitterIcon sx={{color:'white', fontSize:'1.5rem', cursor:'pointer'}} />
                </Box>
              </Box>  
            </Box>
          </Box>
          
          {/* right */}
          
        </Box>
        
      </Box>
    </Box>
  );
};

export default Content;
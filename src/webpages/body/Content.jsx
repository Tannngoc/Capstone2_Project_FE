import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Header from "./components/Header";
import Quote from "./components/Quote";
import About from "./components/About";
// import Financials from "./components/Financials";
// import Forecasts from "./components/Forecasts";
// import Chatbot from "./components/Chatbot";
// import News from "./components/News";
import HandleChart from "./HandleChart";
import { Market } from "../markets/Market";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Market />
      </Box>
    </Box>
  );
};

export default Content;
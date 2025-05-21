import { Box, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
const companies = ["AAPL", "MSFT", "IBM", "NVDA", "TSLA"];


const Header = ({ data, symbol }) => {

  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
    const [stockData, setStockData] = useState({});
    const [loading, setLoading] = useState(false);
    const [predictions, setPredictions] = useState([]);
  
    const fetchStockData = async (symbol) => {
      setLoading(true);
      const currentYear = new Date().getFullYear();
      const monthsToFetch = Array.from({ length: 12 }, (_, i) => ({
        year: currentYear,
        month: i + 1,
      }));
  
      try {
        const allData = [];
  
        for (const { year, month } of monthsToFetch) {
          const res = await axios.get(
            `http://127.0.0.1:5000/api/stock-price/${symbol}/${year}/${month}`
          );
          allData.push(...res.data);
        }
  
        setStockData((prev) => ({
          ...prev,
          [symbol]: {
            chartData: allData,
            quote: null,
            about: null,
            financials: null,
            forecasts: null,
          },
        }));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchPrediction = async (symbol) => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/api/predict/${symbol}`
        );
        setPredictions([res.data]); // Mảng để tương thích phần render
      } catch (err) {
        console.error("Error fetching prediction:", err);
        setPredictions([]);
      }
    };
  
    useEffect(() => {
      if (!stockData[selectedCompany]) {
        fetchStockData(selectedCompany);
      }
      fetchPrediction(selectedCompany);
    }, [selectedCompany]);
  
    useEffect(() => {
      companies.forEach((symbol) => {
        if (!stockData[symbol]) {
          fetchStockData(symbol);
        }
      });
    }, []);
  
    const currentData = stockData[selectedCompany];
  
    const calculateAverages = (data) => {
      const avg = (arr, key) =>
        arr.length ? arr.reduce((sum, d) => sum + d[key], 0) / arr.length : 0;
  
      return {
        open: avg(data, "open_price"),
        close: avg(data, "close_price"),
        high: avg(data, "high_price"),
        low: avg(data, "low_price"),
      };
    };
  
    const pieData = {
      open: [],
      close: [],
      high: [],
      low: [],
    };
  
    const totals = {
      open: 0,
      close: 0,
      high: 0,
      low: 0,
    };
  
    if (companies.every((symbol) => stockData[symbol]?.chartData)) {
      companies.forEach((symbol) => {
        const avg = calculateAverages(stockData[symbol].chartData);
        Object.keys(totals).forEach((key) => {
          totals[key] += avg[key];
        });
      });
  
      ["open", "close", "high", "low"].forEach((key) => {
        const selected = calculateAverages(stockData[selectedCompany].chartData)[
          key
        ];
        const others = totals[key] - selected;
  
        pieData[key] = [
          { name: selectedCompany, value: selected },
          { name: "Others", value: others },
        ];
      });
    }
  
    const pieColors = ["#ef5350", "#42a5f5"];
  
  return (
    // <Box sx={{ display: 'flex', height: '100px', flexDirection: 'column' }}>
    //   <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'black' }}>
    //     {data.name}
    //   </Typography>
    //   <Typography variant="h6" component="h2" sx={{ fontWeight: 'normal', color: 'black' }}>
    //     {data.subtitle}
    //   </Typography>
    // </Box>
    <Box>
      {loading ? <Button
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
  </Button> : <p>NO data</p>} 
    
    </Box>

  )
}

export default Header
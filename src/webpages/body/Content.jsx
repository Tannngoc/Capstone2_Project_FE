import { Box, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

// import Header from "./components/Header";
import Qoute from "./components/Quote";
// import About from "./components/About";
// import Financials from "./components/Financials";
// import Forecasts from "./components/Forecasts";

import StockPriceChart from "./components/StockLineChart";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const companies = [
  "AAPL", "MSFT", "IBM", "NVDA", "TSLA"
];

const Content = ({isLogin}) => {
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

        {/* Line Chart */}
        <Box sx={{ padding: "1rem", minHeight: 400 }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <CircularProgress />
            </Box>
          ) : currentData?.chartData ? (
            <StockPriceChart data={currentData.chartData} />
          ) : (
            <p>No data available.</p>
          )}
        </Box>

        {/* Pie Charts */}
        {pieData.open.length > 0 && (
          <Box
            sx={{
              padding: "2rem",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "red" }}>
              Average Price Comparison: {selectedCompany} vs Others
            </h2>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 4,
              }}
            >
              {["open", "close", "high", "low"].map((key) => (
                <Box key={key} sx={{ textAlign: "center" }}>
                  <h4>{key.toUpperCase()} Price</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData[key]}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        label
                      >
                        {pieData[key].map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={pieColors[index % pieColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* AI Prediction (One Company) */}
        {predictions.length > 0 && (
          <Box
            sx={{
              marginTop: "2rem",
              padding: "2rem",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                width: "100%",
                color: "red",
              }}
            >
              📈 AI Stock Forecast for {selectedCompany}
            </h2>
            {/* Predictions Section */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 2,
                flex: 1,
                marginRight: "2rem",
              }}
            >
              {predictions.map((stock) => (
                <Box
                  key={stock.stock_code}
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "1rem",
                    textAlign: "left",
                    backgroundColor:
                      stock.action === "Buy"
                        ? "#e8f5e9"
                        : stock.action === "Sell"
                        ? "#ffebee"
                        : "#f3f3f3",
                  }}
                >
                  <h3>{stock.stock_code}</h3>
                  <p>
                    Current: <strong>{stock.amount}</strong>
                  </p>
                  <p>
                    Predicted: <strong>{stock.predict}</strong>
                  </p>
                  <p>
                    Change:{" "}
                    <strong
                      style={{
                        color: stock.type === "increase" ? "green" : "red",
                      }}
                    >
                      {stock.percent}
                    </strong>
                  </p>
                  <p>
                    Recommend:{" "}
                    <strong
                      style={{
                        color:
                          stock.action === "Buy"
                            ? "green"
                            : stock.action === "Sell"
                            ? "red"
                            : "gray",
                      }}
                    >
                      {stock.action}
                    </strong>
                  </p>
                </Box>
              ))}
            </Box>

            {/* Bot and Speech Bubble (shaking only this) */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                width: "100px",
                height: "120px",
                animation: "gentle-shake 2s ease-in-out infinite",
              }}
            >
              {/* Speech Bubble */}
              <Box
                sx={{
                  position: "absolute",
                  top: "-60px",
                  right: "-20px",
                  width: "160px",
                  padding: "10px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "13px",
                  transform: "rotate(-3deg)",
                }}
              >
                Suggestion for you!
              </Box>

              {/* Bot image */}
              <img
                src="src/img/pngtree-cute-robot-holding-a-screwdriver-3d-illustration-png-image_16157059.png"
                alt="AI Bot"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        )}

        <Qoute isLogin={isLogin} selectedCompany={selectedCompany} />
      </Box>
    </Box>
  );
};

export default Content;

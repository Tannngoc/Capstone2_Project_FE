import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  List,
  ListItem,
  Divider,
} from "@mui/material";

const symbolToName = {
  AAPL: "Apple Inc.",
  IBM: "IBM",
  NVDA: "NVIDIA Corporation",
  MSFT: "Microsoft Corp.",
  TSLA: "Tesla Inc.",
};

export const Market = () => {
  const [hotStocks, setHotStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/news/latest")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoadingNews(false);
      })
      .catch(() => setLoadingNews(false));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/stock-price/latest-summary")
      .then((res) => res.json())
      .then((data) => {
        setHotStocks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Box sx={{ maxWidth: "90vw", mx: "auto", p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{ color: "red", fontWeight: "bold" }}
            variant="h3"
            component="h1"
            gutterBottom
          >
            Market
          </Typography>
          <Typography sx={{ color: "gray", display: "flex", gap: "2px" }}>
            Up-to-date stock market data coverage from{" "}
            <Typography
              component="span"
              sx={{ color: "red", fontWeight: "bold" }}
            >
              Hubble
            </Typography>
            . Get the latest updates on US markets, world markets, stock quotes,
            crypto, commodities and currencies.
          </Typography>
        </Box>

        {/* Hot Stocks Section */}
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            component="h2"
            gutterBottom
          >
            Today's Hot Stocks
          </Typography>
          <Paper elevation={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Symbol</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Price ($)
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Change
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    % Change
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Volume
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  hotStocks.map((stock) => (
                    <TableRow key={stock.symbol}>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {stock.symbol}
                      </TableCell>
                      <TableCell>
                        {symbolToName[stock.symbol] || stock.symbol}
                      </TableCell>
                      <TableCell align="right">
                        {Number(stock.close).toFixed(2)}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            Number(stock.change) >= 0
                              ? "success.main"
                              : "error.main",
                        }}
                      >
                        {Number(stock.change) > 0 ? "+" : ""}
                        {Number(stock.change).toFixed(2)}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            Number(stock.percent_change) >= 0
                              ? "success.main"
                              : "error.main",
                        }}
                      >
                        {Number(stock.percent_change) > 0 ? "+" : ""}
                        {Number(stock.percent_change).toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {Number(stock.volume).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </Box>

        {/* News Section */}
        <Box>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            component="h2"
            gutterBottom
          >
            Company News
          </Typography>
          <Paper elevation={2} sx={{ p: 2 }}>
            <List>
              {loadingNews ? (
                <ListItem>Loading...</ListItem>
              ) : (
                news.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <ListItem
                      sx={{ display: "block", cursor: "pointer" }}
                      component="a"
                      href="https://finance.yahoo.com/topic/latest-news/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography
                        variant="subtitle1"
                        component="span"
                        fontWeight="bold"
                      >
                        {symbolToName[item.company] || item.company}:
                      </Typography>{" "}
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ color: "gray", ml: 1, mr: 1 }}
                      >
                        [{item.published_date}]
                      </Typography>
                      <span>{item.title}</span>
                    </ListItem>
                    {idx < news.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

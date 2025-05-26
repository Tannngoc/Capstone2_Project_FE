import React from "react";
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
  Link,
  Divider,
} from "@mui/material";

const hotStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 192.32,
    change: 2.15,
    percentChange: 1.13,
    volume: "54.2M",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2845.12,
    change: -15.23,
    percentChange: -0.53,
    volume: "1.2M",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 715.5,
    change: 10.5,
    percentChange: 1.49,
    volume: "32.8M",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 3342.88,
    change: 25.67,
    percentChange: 0.77,
    volume: "3.5M",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 299.01,
    change: -1.12,
    percentChange: -0.37,
    volume: "18.7M",
  },
];

const news = [
  {
    company: "Apple Inc.",
    headline: "Apple launches new iPhone with advanced AI features",
    url: "#",
  },
  {
    company: "Alphabet Inc.",
    headline: "Google announces breakthrough in quantum computing",
    url: "#",
  },
  {
    company: "Tesla Inc.",
    headline: "Tesla hits record deliveries in Q2",
    url: "#",
  },
  {
    company: "Amazon.com Inc.",
    headline: "Amazon expands grocery delivery to new cities",
    url: "#",
  },
  {
    company: "Microsoft Corp.",
    headline: "Microsoft unveils new cloud security platform",
    url: "#",
  },
];

export const Market = () => {
  return (
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
              {hotStocks.map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {stock.symbol}
                  </TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell align="right">{stock.price.toFixed(2)}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: stock.change >= 0 ? "success.main" : "error.main",
                    }}
                  >
                    {stock.change > 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color:
                        stock.percentChange >= 0
                          ? "success.main"
                          : "error.main",
                    }}
                  >
                    {stock.percentChange > 0 ? "+" : ""}
                    {stock.percentChange.toFixed(2)}%
                  </TableCell>
                  <TableCell align="right">{stock.volume}</TableCell>
                </TableRow>
              ))}
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
            {news.map((item, idx) => (
              <React.Fragment key={idx}>
                <ListItem sx={{ display: "block" }}>
                  <Typography
                    variant="subtitle1"
                    component="span"
                    fontWeight="bold"
                  >
                    {item.company}:
                  </Typography>{" "}
                  <Link href={item.url} color="primary" underline="hover">
                    {item.headline}
                  </Link>
                </ListItem>
                {idx < news.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

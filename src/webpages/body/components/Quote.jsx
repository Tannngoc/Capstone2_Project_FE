import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

// "AAPL", "MSFT", "IBM", "NVDA", "TSLA"
const Quote = ({ selectedCompany, isLogin }) => {
  const [openBuy, setOpenBuy] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(2000);
  const handleOpenBuy = () => {
    setOpenBuy(true);
    setQuantity(1);
  };
  const handleCloseBuy = () => setOpenBuy(false);

  const handleOpenSell = () => {
    setOpenSell(true);
    setQuantity(1);
  };
  const handleCloseSell = () => setOpenSell(false);

  const handleQuantityChange = (e) => {
    const val = Math.max(1, Number(e.target.value));
    setQuantity(val);
  };

  const latestMonthPrice = 90;
  const averagePrice = 100;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "4px",
        margin: "2rem 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "3rem",
          marginBottom: "1rem",
          alignItems: "baseline",
          fontWeight: "bold",
          fontSize:'2rem',
          color:'red'
        }}
      >
        {selectedCompany}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "3rem",
          marginBottom: "1rem",
          alignItems: "baseline",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <Typography sx={{fontWeight:'bold', fontSize:'1.5rem', marginBottom:'.5rem'}}>Qoute</Typography>

          {selectedCompany == "AAPL" ? (
            <Typography>
              Apple Inc. (AAPL) is a multinational technology company known for
              designing, manufacturing, and marketing a wide range of consumer
              electronics, software, and services. The company's products
              include smartphones (iPhone), personal computers (Mac), tablets
              (iPad), wearables (Apple Watch), and accessories like AirPods.
              Apple also provides services like the App Store, iCloud, and
              streaming services, according to Reuters.
            </Typography>
          ) : selectedCompany == "MSFT" ? (
            <Typography>
              Microsoft Corporation (MSFT) is a multinational technology company
              headquartered in Redmond, Washington. Founded in 1975 by Bill
              Gates and Paul Allen, it initially gained dominance in the
              operating systems market with MS-DOS and later, Windows. Today,
              Microsoft is a leading provider of cloud computing services,
              software, hardware, and online services, encompassing a wide range
              of offerings from personal computing and entertainment to
              enterprise solutions and artificial intelligence. The company's
              flagship products include the Windows operating system, Microsoft
              Office suite, and Azure cloud platform. Microsoft has also
              expanded into gaming with its Xbox consoles and services like Xbox
              Live and Game Pass. The company is known for its commitment to
              innovation, security, and sustainability, making it a key player
              in the global technology landscape.
            </Typography>
          ) : selectedCompany == "IBM" ? (
            <Typography>
              International Business Machines Corporation (IBM) is a
              multinational technology and consulting company headquartered in
              Armonk, New York. Founded in 1911, IBM has evolved from its early
              days as a hardware manufacturer to become a leader in cloud
              computing, artificial intelligence (AI), and enterprise solutions.
              The company offers a wide range of products and services,
              including mainframe computers, software, data analytics, and IT
              consulting. IBM is known for its research and development efforts,
              holding numerous patents and pioneering advancements in various
              fields, including quantum computing and blockchain technology.
              With a strong focus on innovation and sustainability, IBM
              continues to play a significant role in shaping the future of
              technology.
            </Typography>
          ) : selectedCompany == "NVDA" ? (
            <Typography>
              NVIDIA Corporation (NVDA) is a leading American technology company
              known for its graphics processing units (GPUs) and artificial
              intelligence (AI) solutions. Founded in 1993, NVIDIA initially
              gained prominence in the gaming industry with its GeForce GPUs,
              which revolutionized computer graphics. Over the years, the
              company has expanded its focus to include AI, deep learning, and
              data center solutions, positioning itself as a key player in the
              AI revolution. NVIDIA's products are widely used in gaming,
              professional visualization, data centers, and automotive
              applications. The company's commitment to innovation and
              cutting-edge technology has made it a leader in the semiconductor
              industry.
            </Typography>
          ) : selectedCompany == "TSLA" ? (
            <Typography>
              Tesla, Inc. (TSLA) is an American electric vehicle (EV) and clean
              energy company founded in 2003 by Elon Musk, JB Straubel, Martin
              Eberhard, Marc Tarpenning, and Ian Wright. Headquartered in Palo
              Alto, California, Tesla is known for its innovative electric cars,
              battery energy storage systems, and solar products. The company's
              flagship vehicles include the Model S, Model 3, Model X, and Model
              Y, which have gained popularity for their performance, range, and
              advanced technology features. In addition to electric vehicles,
              Tesla produces energy storage solutions like the Powerwall and
              Powerpack and solar products through its subsidiary SolarCity.
              Tesla's mission is to accelerate the world's transition to
              sustainable energy.
            </Typography>
          ) : null}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <Box
            sx={{
              padding: "1rem",
              width: "100%",
              borderBottom: "1px solid black",
            }}
          >
            <Box sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
              {selectedCompany}
            </Box>

            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Typography sx={{ color: "#8b866d" }}>NSE</Typography>
                <Typography sx={{ color: "green" }}>395.22$</Typography>
              </Box>

              <Box sx={{ display: "flex" }}>
                <Typography sx={{ color: "#8b866d" }}>+38.95</Typography>
                <Typography sx={{ color: "#8b866d" }}>(11.2%)</Typography>
              </Box>
            </Box>
          </Box>

          {/* <Box sx={{width:'100%', display:'flex',gap:'2rem', alignItems:'center', justifyContent:'center', padding:'1rem'}}>

              </Box> */}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            {!isLogin ? (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    border: "1px solid red",
                    color: "red",
                    fontSize: "1.3rem",
                    padding: ".5rem 4rem",
                  }}
                  fullWidth
                >
                  Buy
                </Button>
              </Link>
            ) : (
              <Button
                sx={{
                  border: "1px solid red",
                  color: "red",
                  fontSize: "1.3rem",
                  padding: ".5rem 4rem",
                }}
                onClick={handleOpenBuy}
                fullWidth
              >
                Buy
              </Button>
            )}

            {!isLogin ? (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    border: "1px solid red",
                    color: "white",
                    backgroundColor: "red",
                    fontSize: "1.3rem",
                    padding: ".5rem 4rem",
                  }}
                  fullWidth
                >
                  Sell
                </Button>
              </Link>
            ) : (
              <Button
                sx={{
                  border: "1px solid red",
                  color: "white",
                  backgroundColor: "red",
                  fontSize: "1.3rem",
                  padding: ".5rem 4rem",
                }}
                onClick={handleOpenSell}
                fullWidth
              >
                Sell
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Dialog open={openSell} onClose={handleCloseSell} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #FF0000 0%, #8b866d 100%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Sell {selectedCompany}
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2, color: "#555" }}>
            Price:{" "}
            <span style={{ color: "#FF0000", fontWeight: 600 }}>{price}$</span>
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "#8b866d" }}>
            Stocks Own: <span style={{ fontWeight: 600 }}>{0}</span>
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              sx={{ flex: 1 }}
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Total"
              value={`${(quantity * price).toFixed(2)}$`}
              InputProps={{ readOnly: true }}
              sx={{ flex: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "1.5rem",
            justifyContent: "space-between",
            background: "#f9f9f9",
          }}
        >
          <Button
            onClick={handleCloseSell}
            sx={{ borderRadius: 2, color: "#8b866d" }}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #FF0000 0%, #8b866d 100%)",
              color: "white",
              borderRadius: 2,
              fontWeight: "bold",
              px: 4,
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openBuy} onClose={handleCloseBuy} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #4CAF50 0%, #8b866d 100%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Buy {selectedCompany}
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2, color: "#555" }}>
            Price:{" "}
            <span style={{ color: "#4CAF50", fontWeight: 600 }}>{price}$</span>
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              sx={{ flex: 1 }}
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Total"
              value={`${(quantity * 100).toFixed(2)}$`}
              InputProps={{ readOnly: true }}
              sx={{ flex: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "1.5rem",
            justifyContent: "space-between",
            background: "#f9f9f9",
          }}
        >
          <Button
            onClick={handleCloseBuy}
            sx={{ borderRadius: 2, color: "#8b866d" }}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #4CAF50 0%, #8b866d 100%)",
              color: "white",
              borderRadius: 2,
              fontWeight: "bold",
              px: 4,
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Quote;

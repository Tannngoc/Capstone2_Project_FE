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
} from "@mui/material";
import axios from "axios";

const Quote = ({ selectedCompany, isLogin, userId = 1 }) => {
  const [openBuy, setOpenBuy] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(2000);

  // Mở dialog Buy
  const handleOpenBuy = () => {
    setQuantity(1);
    setOpenBuy(true);
  };
  const handleCloseBuy = () => setOpenBuy(false);

  // Mở dialog Sell
  const handleOpenSell = () => {
    setQuantity(1);
    setOpenSell(true);
  };
  const handleCloseSell = () => setOpenSell(false);

  // Handle thay đổi số lượng
  const handleQuantityChange = (e) => {
    const val = Math.max(1, Number(e.target.value));
    setQuantity(val);
  };

  // Gọi API đặt lệnh mua hoặc bán
  const placeOrder = async (orderType) => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/orders/place", {
        user_id: userId,
        stock_symbol: selectedCompany,
        order_type: orderType,
        quantity,
        price,
      });
      alert(`${orderType} order successful!`);
      if (orderType === "BUY") handleCloseBuy();
      else handleCloseSell();
    } catch (error) {
      console.error(
        `${orderType} failed:`,
        error.response?.data || error.message
      );
      alert(`${orderType} order failed. Please try again.`);
    }
  };

  // Xử lý xác nhận mua
  const handleBuyConfirm = () => {
    placeOrder("BUY");
  };

  // Xử lý xác nhận bán
  const handleSellConfirm = () => {
    placeOrder("SELL");
  };

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
          fontSize: "2rem",
          color: "red",
        }}
      >
        {selectedCompany}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            marginBottom: ".5rem",
          }}
        >
          Quote
        </Typography>

        {selectedCompany === "AAPL" ? (
          <Typography>
            Apple Inc. (AAPL) is a multinational technology company known for
            designing, manufacturing, and marketing a wide range of consumer
            electronics, software, and services. The company's products include
            smartphones (iPhone), personal computers (Mac), tablets (iPad),
            wearables (Apple Watch), and accessories like AirPods. Apple also
            provides services like the App Store, iCloud, and streaming
            services, according to Reuters.
          </Typography>
        ) : selectedCompany === "MSFT" ? (
          <Typography>
            Microsoft Corporation (MSFT) is a multinational technology company
            headquartered in Redmond, Washington. Founded in 1975 by Bill Gates
            and Paul Allen, it initially gained dominance in the operating
            systems market with MS-DOS and later, Windows. Today, Microsoft is a
            leading provider of cloud computing services, software, hardware,
            and online services, encompassing a wide range of offerings from
            personal computing and entertainment to enterprise solutions and
            artificial intelligence. The company's flagship products include the
            Windows operating system, Microsoft Office suite, and Azure cloud
            platform. Microsoft has also expanded into gaming with its Xbox
            consoles and services like Xbox Live and Game Pass. The company is
            known for its commitment to innovation, security, and
            sustainability, making it a key player in the global technology
            landscape.
          </Typography>
        ) : selectedCompany === "IBM" ? (
          <Typography>
            International Business Machines Corporation (IBM) is a multinational
            technology and consulting company headquartered in Armonk, New York.
            Founded in 1911, IBM has evolved from its early days as a hardware
            manufacturer to become a leader in cloud computing, artificial
            intelligence (AI), and enterprise solutions. The company offers a
            wide range of products and services, including mainframe computers,
            software, data analytics, and IT consulting. IBM is known for its
            research and development efforts, holding numerous patents and
            pioneering advancements in various fields, including quantum
            computing and blockchain technology. With a strong focus on
            innovation and sustainability, IBM continues to play a significant
            role in shaping the future of technology.
          </Typography>
        ) : selectedCompany === "NVDA" ? (
          <Typography>
            NVIDIA Corporation (NVDA) is a leading American technology company
            known for its graphics processing units (GPUs) and artificial
            intelligence (AI) solutions. Founded in 1993, NVIDIA initially
            gained prominence in the gaming industry with its GeForce GPUs,
            which revolutionized computer graphics. Over the years, the company
            has expanded its focus to include AI, deep learning, and data center
            solutions, positioning itself as a key player in the AI revolution.
            NVIDIA's products are widely used in gaming, professional
            visualization, data centers, and automotive applications. The
            company's commitment to innovation and cutting-edge technology has
            made it a leader in the semiconductor industry.
          </Typography>
        ) : selectedCompany === "TSLA" ? (
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
          <Link to="/login" style={{ textDecoration: "none", flex: 1 }}>
            <Button
              sx={{
                border: "1px solid red",
                color: "red",
                fontSize: "1.3rem",
                padding: ".5rem 4rem",
                width: "100%",
              }}
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
              flex: 1,
            }}
            onClick={handleOpenBuy}
          >
            Buy
          </Button>
        )}

        {!isLogin ? (
          <Link to="/login" style={{ textDecoration: "none", flex: 1 }}>
            <Button
              sx={{
                border: "1px solid red",
                color: "white",
                backgroundColor: "red",
                fontSize: "1.3rem",
                padding: ".5rem 4rem",
                width: "100%",
              }}
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
              flex: 1,
            }}
            onClick={handleOpenSell}
          >
            Sell
          </Button>
        )}
      </Box>

      {/* Dialog Sell */}
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
          <Typography variant="subtitle1" color="text.secondary">
            Current Price: <b style={{ color: "#FF0000" }}>{price}$</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your Holdings: <b>20</b> shares{" "}
            {/* TODO: Replace with real holdings */}
          </Typography>
          <TextField
            label="Quantity to Sell"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            fullWidth
          />
          <TextField
            label="Total Value"
            value={`${(quantity * price).toFixed(2)}$`}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </DialogContent>
        <DialogActions
          sx={{
            padding: "1.5rem",
            justifyContent: "space-between",
            background: "#f9f9f9",
          }}
        >
          <Button onClick={handleCloseSell} sx={{ color: "#8b866d" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSellConfirm}
            sx={{
              background: "linear-gradient(90deg, #FF0000 0%, #8b866d 100%)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Confirm Sell
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Buy */}
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
          <Typography variant="subtitle1" color="text.secondary">
            Current Price: <b style={{ color: "#4CAF50" }}>{price}$</b>
          </Typography>
          <TextField
            label="Quantity to Buy"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            fullWidth
          />
          <TextField
            label="Total Cost"
            value={`${(quantity * price).toFixed(2)}$`}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </DialogContent>
        <DialogActions
          sx={{
            padding: "1.5rem",
            justifyContent: "space-between",
            background: "#f9f9f9",
          }}
        >
          <Button onClick={handleCloseBuy} sx={{ color: "#8b866d" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleBuyConfirm}
            sx={{
              background: "linear-gradient(90deg, #4CAF50 0%, #8b866d 100%)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Confirm Buy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Quote;

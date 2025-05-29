import { Box, Typography } from "@mui/material";

const Header = ({ symbol }) => (
  <Box
    sx={{
      display: 'flex',
      height: '100px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'red' }}>
    Stock exchange rate details for: {symbol}
    </Typography>
  </Box>
);

export default Header;
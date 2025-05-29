import React from "react";
import { Box } from "@mui/material";

const LegendItem = ({ label, color }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box
      sx={{
        width: 12,
        height: 12,
        backgroundColor: color,
        borderRadius: "50%",
      }}
    />
    <span style={{ fontSize: "14px" }}>{label}</span>
  </Box>
);

export default LegendItem;

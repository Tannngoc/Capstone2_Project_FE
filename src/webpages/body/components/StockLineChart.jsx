import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const StockPriceChart = ({ data }) => {
  const chartWidth = Math.max(data.length * 30, 1000);
  const lineScrollRef = useRef(null);
  const barScrollRef = useRef(null);

  useEffect(() => {
    if (lineScrollRef.current) {
      lineScrollRef.current.scrollLeft = lineScrollRef.current.scrollWidth;
    }
    if (barScrollRef.current) {
      barScrollRef.current.scrollLeft = barScrollRef.current.scrollWidth;
    }
  }, [data]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Line Chart */}
      <Box sx={{ overflowX: "auto" }} ref={lineScrollRef}>
        <Box sx={{ width: `${chartWidth}px`, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ left: 60, right: 20, top: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                }
              />
              <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
              <Tooltip />
              <Line type="monotone" dataKey="open_price" stroke="#42a5f5" name="Open" />
              <Line type="monotone" dataKey="close_price" stroke="#ef5350" name="Close" />
              <Line type="monotone" dataKey="high_price" stroke="#66bb6a" name="High" />
              <Line type="monotone" dataKey="low_price" stroke="#ffa726" name="Low" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* Legend for Line Chart */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          px: 2,
        }}
      >
        <LegendItem label="Open" color="#42a5f5" />
        <LegendItem label="Close" color="#ef5350" />
        <LegendItem label="High" color="#66bb6a" />
        <LegendItem label="Low" color="#ffa726" />
      </Box>

      {/* Bar Chart */}
      <Box sx={{ overflowX: "auto" }} ref={barScrollRef}>
        <Box sx={{ width: `${chartWidth}px`, height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ left: 60, right: 20, top: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                }
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#ab47bc" name="Volume" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* Legend for Bar Chart */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          px: 2,
        }}
      >
        <LegendItem label="Volume" color="#ab47bc" />
      </Box>
    </Box>
  );
};

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

export default StockPriceChart;

import { useState, useEffect } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import ManageUser from "./component/ManageUser.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Manage Users", path: "/dashboard/manageusers" },
    { name: "Manage Roles", path: "/dashboard/manageroles" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const handleNavigation = (path) => {
    setActivePage(path);
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#fff" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", bgcolor: "black", color: "white" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", p: 2 }}>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          />
          <Typography sx={{ fontWeight: "bold", color: "white", fontSize: "2rem" }}>
            Hubble
          </Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  bgcolor: activePage === item.path ? "red" : "transparent",
                  color: "white",
                  marginBottom: "10px",
                  "&:hover": { bgcolor: "darkred" },
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content - Route Switcher */}
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: "#f1f1f1" }}>
        <Routes>
          <Route path="/" element={<Navigate to="manageusers" />} />
          <Route path="manageusers" element={<ManageUser />} />
          <Route path="manageroles" element={<h1>Manage Roles</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard
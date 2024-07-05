import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

export default function ButtonAppBar() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error.message);
    }
  };

  // Function to get the first name from the display name or email
  const getFirstName = () => {
    if (currentUser && currentUser.displayName) {
      return currentUser.displayName.split(" ")[0];
    }
    // if (currentUser && currentUser.email) {
    //   const emailName = currentUser.email.split("@")[0];
    //   return emailName.replace(/\d/g, ""); // Remove digits
    // }
    // return "User";
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "1rem",
                maxWidth: "200px", // Adjust this value as needed
              }}
            >
              Hello {getFirstName()},
              <br /> you're now logged in.
            </Typography>
          </Box>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontSize: "0.8rem",
              padding: "4px 8px",
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

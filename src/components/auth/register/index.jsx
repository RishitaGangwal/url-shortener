import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import validator from "validator";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getCurrentUser } from "../../../firebase/auth"; // Import function to get current user

const defaultTheme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState(""); // State to hold display name

  // Function to validate email format
  const validateEmail = (emailValue) => {
    setEmail(emailValue);
    setEmailError(!validator.isEmail(emailValue));
  };

  // Function to validate password strength
  const validatePassword = (passwordValue) => {
    setPassword(passwordValue);
    setPasswordError(passwordValue.length < 8);
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!email || !password || !firstName || !lastName) {
      setSnackbarMessage("Please fill out all details.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    // Validate email and password
    if (validator.isEmail(email) && password.length >= 8) {
      setIsRegistering(true);
      try {
        // Perform registration logic (e.g., Firebase registration)
        await doCreateUserWithEmailAndPassword(
          email,
          password,
          firstName,
          lastName
        );
        setSnackbarMessage("Sign up successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Fetch and set display name after registration
        const currentUser = await getCurrentUser();
        setDisplayName(currentUser.displayName);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        console.error("Error creating user:", error.message);
        setSnackbarMessage("Failed to sign up. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Redirect if user is already logged in
  if (userLoggedIn) {
    return <Navigate to={"/home"} replace={true} />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className="shadow" component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "10rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={emailError}
                  helperText={emailError ? "Invalid email address" : ""}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => validateEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError}
                  helperText={
                    passwordError
                      ? "Password should be at least 8 characters"
                      : ""
                  }
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => validatePassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <p className="text-sm ml-20">
                  Already have an account?{" "}
                  <Link to={"/login"} className="hover:underline font-bold">
                    Sign in
                  </Link>
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Register;

import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth"; // Import Firebase authentication methods
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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showFillDetails, setShowFillDetails] = useState(false);
  const [showSignUpFirst, setShowSignUpFirst] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    // Check if email and password are filled
    if (!email || !password) {
      setShowFillDetails(true);
      return;
    }

    // Validate email and password
    if (validator.isEmail(email) && password.length >= 8) {
      setIsSigningIn(true);
      try {
        // Sign in with Firebase authentication
        await doSignInWithEmailAndPassword(email, password);
        navigate("/home"); // Redirect to home page after successful sign-in
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          setShowSignUpFirst(true);
        } else if (error.code === "auth/wrong-password") {
          setErrorMessage("Incorrect password. Please try again.");
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage("Incorrect email. Please try again.");
        } else {
          setErrorMessage("Failed to sign in. Please check your credentials.");
        }
        setIsSigningIn(false);
      }
    }
  };

  // Handle Google sign-in
  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  // Snackbar close handlers
  const handleCloseFillDetails = () => {
    setShowFillDetails(false);
  };

  const handleCloseSignUpFirst = () => {
    setShowSignUpFirst(false);
  };

  const handleCloseErrorMessage = () => {
    setErrorMessage("");
  };

  // Redirect to register page
  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Redirect if user is already logged in
  if (userLoggedIn) {
    return <Navigate to={"/home"} replace={true} />;
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <Container className="container-shadow" component="main" maxWidth="xs">
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={emailError}
              helperText={emailError ? "Invalid email address" : ""}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
            />
            <TextField
              error={passwordError}
              helperText={
                passwordError ? "Password should be at least 8 characters" : ""
              }
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <RouterLink to="/forgot" variant="body2">
                  Forgot password?
                </RouterLink> */}
              </Grid>
              <Grid item>
                <p className="text-sm ml-20">
                  Don't have an account?{" "}
                  <Link
                    to={"/register"}
                    className="hover:underline font-bold"
                    onClick={handleNavigateToRegister}
                  >
                    Sign up
                  </Link>
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {/* Snackbar for fill details */}
      <Snackbar
        open={showFillDetails}
        autoHideDuration={6000}
        onClose={handleCloseFillDetails}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseFillDetails}
          severity="error"
        >
          Please fill in all details.
        </MuiAlert>
      </Snackbar>

      {/* Snackbar for sign up first */}
      <Snackbar
        open={showSignUpFirst}
        autoHideDuration={6000}
        onClose={handleCloseSignUpFirst}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSignUpFirst}
          severity="warning"
        >
          Please sign up first.
        </MuiAlert>
      </Snackbar>

      {/* Snackbar for error messages */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseErrorMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseErrorMessage}
          severity="error"
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Login;

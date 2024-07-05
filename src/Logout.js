// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../src/contexts/authContext";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import { doSignOut } from "../src/firebase/auth"; // Adjust path as per your project structure

// const Logout = () => {
//   const { setCurrentUser } = useAuth(); // Assuming you have setCurrentUser in your context
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await doSignOut(); // Call the logout function from auth.js
//       setCurrentUser(null); // Clear user context state if needed
//       navigate("/login"); // Redirect to login page after logout
//     } catch (error) {
//       console.error("Failed to log out:", error.message);
//       // Handle any errors that occur during logout
//     }
//   };

//   return (
//     <Stack direction="row" spacing={2}>
//       <Button variant="outlined" onClick={handleLogout}>
//         Logout
//       </Button>
//     </Stack>
//   );
// };

// export default Logout;

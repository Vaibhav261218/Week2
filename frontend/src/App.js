import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./Context";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Navbar from "./components/Navbar.js";
import Dashboard from "./components/Dashboard.js";
import Footer from "./components/Footer.js";
import Track from "./components/Track.js";

function App() {
  const { token } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={token ? <Home /> : <Navigate to="/signup" />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/home" element={<Home />} />
      <Route path="/track" element={<Track />} />
    </Routes>
    
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

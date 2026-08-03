import React, { useContext, useState } from "react";
import HowWorks from "./HowWorks";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Register from "./Register";
import { LogIn } from "lucide-react";
import Login from "./Login";
import { AuthContext } from "../context/AuthProvider";
// import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const App = () => {
  const data=useContext(AuthContext);
  // console.log(data.user);
  
  return (
  <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        toastStyle={{
        background: "#1b1b2f", // Background color
       color: "#fff",         // Text color
       border: "1px solid #7c5cff",
  }}
      />
       <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<HowWorks/>} />
        <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
           </Routes>
  </div>

  );

};

export default App;
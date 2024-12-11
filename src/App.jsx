import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import HomePage from './component/HomePage'; // Import HomePage component
import ProfilePage from './component/ProfilePage';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';   // Import the Toastify CSS
import AboutUs from './component/AboutUs';
import ContactUs from './component/ContactUs'; // Import ContactUs component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} /> {/* Route to HomePage */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} /> {/* Route to ContactUs page */}
      </Routes>

      {/* Add the ToastContainer to show notifications */}
      <ToastContainer 
        position="top-right" // Customize position
        autoClose={5000}    // Customize auto-close time in ms
        hideProgressBar={false}  // Show progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;

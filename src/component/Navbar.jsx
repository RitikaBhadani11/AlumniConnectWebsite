import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); // Navigate to the provided path
  };

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    navigate('/');
  };

  return (
    <nav className="bg-gray-100 p-4 text-black flex justify-between items-center shadow-lg">
      <input
        type="text"
        placeholder="Search..."
        className="bg-white border-2 border-emerald-600 text-black py-2 px-4 rounded-full"
      />
      <div className="flex space-x-6 items-center">
        <button onClick={() => handleNavigate('/chatbot')} className="hover:text-emerald-600 text-black">
          Help
        </button>
        <button onClick={() => handleNavigate('/home')} className="hover:text-emerald-600 text-black">
          Home
        </button>
        <button onClick={() => handleNavigate('/connect')} className="hover:text-emerald-600 text-black">
          Connect People
        </button>
        <button onClick={() => handleNavigate('/about')} className="hover:text-emerald-600 text-black">
          About Us
        </button>
        <button onClick={() => handleNavigate('/profile')} className="hover:text-emerald-600 text-black">
          Profile
        </button>
        <button onClick={() => handleNavigate('/contact')} className="hover:text-emerald-600 text-black">
          Contact
        </button>
        <button
          onClick={handleLogout}
          className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


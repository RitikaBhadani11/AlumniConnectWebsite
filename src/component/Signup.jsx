import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

 /* const handleSignup = () => {
    // Save user details to localStorage
    const userDetails = { username, email, password };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    
    // Redirect to login page after successful signup
    navigate('/');
  };*/
  const handleSignup = async () => {
    const userDetails = { username, email, password };
  
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert("Signup Successful! Please log in.");
        navigate("/login"); // Redirect to login after successful signup
      } else {
        alert(`Signup Failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  const handleLoginRedirect = () => {
    // Redirect to login page if user already has an account
    navigate('/login');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-96 border-2 rounded-xl border-emerald-600 p-10 bg-black shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-600">Signup</h2>
        <form className="flex flex-col">
          <input
            required
            className="border-2 border-emerald-600 mb-5 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-4"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            className="border-2 border-emerald-600 mb-5 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-4"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="border-2 border-emerald-600 mb-5 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-4"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSignup}
            className="mt-5 text-lg text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg py-2"
          >
            Signup
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            Already have an account?{' '}
            <button 
              onClick={handleLoginRedirect} 
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

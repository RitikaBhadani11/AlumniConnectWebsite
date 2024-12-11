import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (storedUserDetails && storedUserDetails.email === email && storedUserDetails.password === password) {
      // If credentials match, redirect to HomePage
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-96 border-2 rounded-xl border-emerald-600 p-10 bg-black shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-600">Login</h2>
        <form className="flex flex-col">
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
            onClick={handleLogin}
            className="mt-5 text-lg text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg py-2"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-center text-white">
          Don't have an account?{' '}
          <Link to="/signup" className="text-emerald-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

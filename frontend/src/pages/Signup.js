import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/signin');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Sign-up failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  const handleSigninRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-xl text-center">
      <h2 className="text-white text-2xl font-bold uppercase mb-6">Create Your Account</h2>
      {error && <p className="text-red-500 font-medium text-sm mb-4">{error}</p>}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="text-left">
          <label htmlFor="email" className="block text-gray-400 font-medium mb-2">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-green-500 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>
        <div className="text-left">
          <label htmlFor="password" className="block text-gray-400 font-medium mb-2">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-green-500 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-400 transform transition duration-300 hover:-translate-y-1 shadow-md"
        >
          Sign Up
        </button>
      </form>
      <button
        className="mt-4 text-green-500 underline hover:text-green-400 transition duration-300"
        onClick={handleSigninRedirect}
      >
        Already have an account? Sign In
      </button>
    </div>
  );
}

export default Signup;

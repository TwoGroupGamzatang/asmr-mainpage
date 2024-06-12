import React, { useState } from 'react';
import axios from 'axios';
import { login } from './api';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        onLoginSuccess(response.data.accessToken);
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Signup error', error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Login;

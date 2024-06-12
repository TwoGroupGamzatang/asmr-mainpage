import React, { useState } from 'react';
import axios from 'axios';
import { preferencesOptions } from './interests'; // 관심사 옵션 가져오기

const Signup = ({ onSignupSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState([]);

  const handleSignup = async (event) => {
    event.preventDefault();
    const signupData = {
      name,
      email,
      password,
      preferences
    };
    console.log('Sending signup request with data:', signupData); // 요청 데이터 로그 출력
    try {
      const response = await axios.post('http://localhost:5004/api/auth/sign-up', signupData);
      console.log('Response:', response); // 응답 로그 출력
      if (response.status === 201) {
        onSignupSuccess(email, password);  // Signup 성공 시, 로그인 정보로 callback 호출
      } else {
        console.error('Signup failed', response);
      }
    } catch (error) {
      console.error('Signup error', error);
    }
  };

  const handlePreferencesChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPreferences([...preferences, value]);
    } else {
      setPreferences(preferences.filter(preference => preference !== value));
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      <div>
        <label>Preferences:</label>
        {preferencesOptions.map(option => (
          <div key={option}>
            <input
              type="checkbox"
              id={`preference-${option}`}
              value={option}
              onChange={handlePreferencesChange}
            />
            <label htmlFor={`preference-${option}`}>{option}</label>
          </div>
        ))}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;

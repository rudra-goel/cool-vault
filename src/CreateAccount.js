import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


import { createNewUser } from './FirebaseFunctions.js';
import { useAuth } from './contexts/AuthContext.js'

const CreateAccountPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const { signUp, currentUser } = useAuth()

  const [userData, setUserData] = useState();

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    // Handle form submission when passwords match
    
    try {
      const userData = await signUp(email, password)
      
      if(userData) {
        const data = createNewUser(name, userData.user.email, userData.user.uid)
        setUserData(data)
      }

      navigate("/")
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="create-account-page">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        {!passwordsMatch && (
          <p className="error-message">Passwords do not match!</p>
        )}
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccountPage;

import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import { getUserData } from './FirebaseFunctions.js';


const LoginPage = (userState, setUserState) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { signIn, currentUser } = useAuth();

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if(email.length === 0 || password.length === 0) {
      return
    }
    
    try {
      const user = await signIn(email, password)

      console.log(user)
      
      navigate("/")
      
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" onClick={ handleLogin }>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

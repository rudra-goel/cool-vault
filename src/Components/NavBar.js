import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault()

    logout();

    navigate('/login')

  }

  if(currentUser) {
    return (
      <div className="navbar">
          <Link to="home">
              <div className="left-section">
                  <h1 className="website-title">R-Vault</h1>
              </div>
          </Link>
        <div className="right-section">
        <button className="nav-button" onClick={handleLogout}>Logout</button>
          
          
  
        </div>
      </div>
    )
  }

  return (
    <div className="navbar">
        <Link to="home">
            <div className="left-section">
                <h1 className="website-title">R-Vault</h1>
            </div>
        </Link>
      <div className="right-section">
        <Link to="/login">
            <button className="nav-button">Login</button>
        </Link>
        <Link to="/createAccount">
            <button className="nav-button">Create an Account</button>
        </Link>

      </div>
    </div>
  )
}

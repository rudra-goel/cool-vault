import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home.js'
import Login from './Login.js'
import CreateAccount from './CreateAccount.js'
import Layout from './Layout.js'
import { AuthProvider } from './contexts/AuthContext.js';
import PrivateRoute from "./PrivateRoute.js"

function App() {

  return (

      <BrowserRouter>
        <AuthProvider>

          <Routes>
            <Route path="/" element={<Layout />} >

              <Route element ={<PrivateRoute  />} >
                <Route path="/" element={<Home />} />
              </Route>

              <Route path="login" element ={<Login />} />
              <Route path="createAccount" element ={<CreateAccount />} />

            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );
}

export default App;
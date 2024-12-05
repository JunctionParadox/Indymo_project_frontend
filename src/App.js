import React from 'react';
import './App.css';
import RegistrationPage from './components/RegistrationPage/Index';
import LoginPage from './components/LoginPage/Index';
import AdminDashboard from './components/AdminDashboard/Index'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    /*temporary placholder for header component */
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

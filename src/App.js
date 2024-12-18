import React from 'react';
import './App.css';
import RegistrationPage from './components/RegistrationPage/Index';
import LoginPage from './components/LoginPage/Index';
import AdminDashboard from './components/AdminDashboard/Index'
import ClientDashboard from './components/ClientDashboard/Index'
import AnalystDashboard from './components/AnalystDashboard/Index';
import IndymoHeader from './components/IndymoHeader/IndymoHeader';
import OrderOverview from './components/OrderOverview/Index';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';



//Routes should be split by role, to prevent unauthorized users from accessing them
function App() {

  return (
    <Router>
      <div className="App">
      <IndymoHeader />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/orders" element={<OrderOverview />} />
          <Route path="/analyst" element={<AnalystDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

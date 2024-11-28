import React, {useState} from 'react';
import './App.css';
import RegistrationPage from './components/RegistrationPage/Index';
import LoginPage from './components/LoginPage/LoginPage';
import Cookies from 'js-cookie';

function App() {

  const [count, setCount] = useState(0);

  return (
    /*temporary placholder for header component */
    <div className="App">
      <header>
        <nav>
          <ul>
          <button id="showMainMenu" className="navigation" onClick={() => setCount(0)}>
                    Register
          </button>
          <button id="showLoginMenu" className="navigation" onClick={() => setCount(1)}>
                    Login
          </button>
          <button id="Cookie" className="navigation" onClick={() => console.log(Cookies.get("Auth"))}>
                    Cookie
          </button>
          </ul>
        </nav>
      </header>
      {count === 0 && <RegistrationPage /> }
      {count === 1 && <LoginPage /> }
    </div>
  );
}

export default App;

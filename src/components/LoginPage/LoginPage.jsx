import React, {useState, useContext} from 'react';
import './LoginPage.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

//Should have input validation
function LoginPage() {
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    const FORM_DATA = new FormData(e.currentTarget);
    const EMAIL = FORM_DATA.get('email');
    const PASSWORD = FORM_DATA.get('password');
    const LOGIN = {EMAIL, PASSWORD};
    const JSONBODY = JSON.stringify({ 
        "Email": LOGIN.EMAIL,
        "Password": LOGIN.PASSWORD,
    })

    await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
       },
         body: JSONBODY
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                Cookies.set('Auth', data.token)
                navigate('/Admin')
            }
        })
        .catch((error) => {
            console.log(error)
            setLoginFailed(true)
        })
        //TODO:: Fix token not updating after first login attempt
        //.then(
            //Cookies.set('Auth', token),
            //console.log(token),
            //navigate('/Admin')
        //)
    }

    return (
        <div className='loginpage'>
            <h1 className='loginheader'>
                    Login
            </h1>
            <form onSubmit={handleSubmit}>
                <p className='loginparagraph' id='email-login'>
                    <label for='email' className='loginlabel'>Email adress:</label>
                    <p />
                    <input name='email' className='loginform' type='text' />
                </p>
                <p className='loginparagraph' id='pass-login'>
                    <label for='password' className='loginlabel'>Password:</label>
                    <p />
                    <input name='password' className='loginform' type='password' />
                </p>
                <p>
                    {loginFailed === true && <a>Incorrect credentials</a>}
                    <button className='submitlogin' type='submit'>Login</button>
                </p>
            </form>
        </div>
    )
}

export default LoginPage;
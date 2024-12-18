import React from 'react';
import './IndymoHeader.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

//Generic header that contains navigation buttons to several pages
//Navigation options should be hidden based on the users role
function IndymoHeader() {

    const navigate = useNavigate();

    function LogOut() {
        Cookies.remove('Auth');
        navigate('/')
    }

    return (
    <div className='indymoheader'>
        <h1>
            <img src='/IndymoLogo.png'></img>
            <NavLink className='link' to='/'>Login</NavLink>
            <NavLink className='link' to='/register'>Register</NavLink>
            <NavLink className='link' to='/admin'>Users</NavLink>
            <NavLink className='link' to='/client'>Create orders</NavLink>
            <NavLink className='link' to='/orders'>Order list</NavLink>
            <NavLink className='link' to='/analyst'>Measurement</NavLink>
            <button onClick={() => LogOut()}>Log out</button>
        </h1>
    </div>
    )
}

export default IndymoHeader;
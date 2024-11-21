import React from 'react';
import './RegistrationPage.css';

function RegistrationPage() {

    const handleSubmit = (e) => {
        e.preventDefault();
        const FORM_DATA = new FormData(e.currentTarget);
        const FIRST_NAME = FORM_DATA.get('firstname');
        const LAST_NAME = FORM_DATA.get('lastname');
        const EMAIL = FORM_DATA.get('email');
        const PASSWORD = FORM_DATA.get('password');
        const USER_ROLE = FORM_DATA.get('userrole')

        //const REGISTRATION = {FIRST_NAME, LAST_NAME, EMAIL, PASSWORD};
    
    //fetch('http://localhost:8000/user', {
    //    method: 'POST',
    //    body: JSON.stringify(registration)
    //})

    alert(JSON.stringify({FIRST_NAME, LAST_NAME, EMAIL, USER_ROLE}));
    }

    return (
        <div class='registerpage'>
            <form onSubmit={handleSubmit}>
                <h1 class='registerheader'>
                    Create user
                </h1>
                <p class='registerparagraph' id='first'>
                    <label for='firstname' class='registerlabel'>First name:</label>
                    <p />
                    <input name='firstname' class='registerform' type='text' />
                </p>
                <p class='registerparagraph' id='last'>
                    <label for='lastname' class='registerlabel'>Last name:</label>
                    <p />
                    <input name='lastname' class='registerform' type='text' />
                </p>
                <p class='registerparagraph' id='email'>
                    <label for='email' class='registerlabel'>Email adress:</label>
                    <p />
                    <input name='email' class='registerform' type='text' />
                </p>
                <p class='registerparagraph' id='role'>
                    <label for='userrole' class='registerlabel'>User role:</label>
                    <p />
                    <select name='userrole' class='registerform'>
                        <option value="1">Analyst</option>
                        <option value="2">Temporary worker</option>
                        <option value="3">Client</option>
                        <option value="4">Administrator</option>
                    </select>
                </p>
                <p class='registerparagraph' id='pass'>
                    <label for='password' class='registerlabel'>Password:</label>
                    <p />
                    <input name='password' class='registerform' type='password' />
                </p>
                <p class='registerparagraph' id='confirm'>
                    <label for='confirm' class='registerlabel'>Confirm password:</label>
                    <p />
                    <input name='confirm' class='registerform' type='password' />
                </p>
                <p>
                    <button class='submitregistration' type='submit'>Create user</button>
                </p>
            </form>
        </div>
    )
}

export default RegistrationPage;
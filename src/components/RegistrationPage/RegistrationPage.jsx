import React, {useState} from 'react';
import './RegistrationPage.css';

function RegistrationPage() {
    //Dialog is set to make a dialog box appear based on the result of attempting submit the form below
    //0 = No dialog box, 1 = Request succesful, 2 = Request failed

    //Should include a method to clear all input boxes on submittal
    //Should have input validation
    const [dialog, setDialog] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const FORM_DATA = new FormData(e.currentTarget);
        const NAME = FORM_DATA.get('firstname');
        const SURNAME = FORM_DATA.get('lastname');
        const EMAIL = FORM_DATA.get('email');
        const PASSWORD = FORM_DATA.get('password');
        const ROLE = parseInt(FORM_DATA.get('userrole'));

        const REGISTRATION = {NAME, SURNAME, EMAIL, PASSWORD, ROLE};
        const JSONBODY = JSON.stringify({ 
            "Name": REGISTRATION.NAME,
            "Surname": REGISTRATION.SURNAME ,
            "Email": REGISTRATION.EMAIL,
            "Password": REGISTRATION.PASSWORD,
            "Role": REGISTRATION.ROLE
        })
    
        fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSONBODY
        })
        .then((response) => {
            if(!response.ok) throw new Error(response.status);
            else return setDialog(1);
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            setDialog(2);
        })}

    return (
        <div className='registerpage'>
            <form onSubmit={handleSubmit}>
                <h1 className='registerheader'>
                    Create user
                </h1>
                <p className='registerparagraph' id='first'>
                    <label htmlFor='firstname' className='registerlabel'>First name:</label>
                <p />
                    <input name='firstname' className='registerform' type='text' />
                </p>
                <p className='registerparagraph' id='last'>
                    <label htmlFor='lastname' className='registerlabel'>Last name:</label>
                    <p />
                    <input name='lastname' className='registerform' type='text' />
                </p>
                <p className='registerparagraph' id='email'>
                    <label htmlFor='email' className='registerlabel'>Email adress:</label>
                    <p />
                    <input name='email' className='registerform' type='text' />
                </p>
                <p className='registerparagraph' id='role'>
                    <label htmlFor='userrole' className='registerlabel'>User role:</label>
                    <p />
                    <select name='userrole' className='registerform'>
                        <option value="0">Analyst</option>
                        <option value="1">Temporary worker</option>
                        <option value="2">Client</option>
                        <option value="3">Administrator</option>
                    </select>
                </p>
                <p className='registerparagraph' id='pass'>
                    <label htmlFor='password' className='registerlabel'>Password:</label>
                    <p />
                    <input name='password' className='registerform' type='password' />
                </p>
                <p className='registerparagraph' id='confirm'>
                    <label htmlFor='confirm' className='registerlabel'>Confirm password:</label>
                    <p />
                    <input name='confirm' className='registerform' type='password' />
                </p>
                <p>
                    <button className='submitregistration' type='submit'>Create user</button>
                </p>
            </form>
            {dialog === 1 && 
            <p className='registerdialog'>
                User has been created succesfully
                <button className='dialogButton' onClick={() => setDialog(0)}>
                    Ok
                </button>
            </p>}
            {dialog === 2 &&
            <p className='registerdialog'>
                User could not be created
                <button className='dialogButton' onClick={() => setDialog(0)}>
                    Ok
                </button>
            </p>}
        </div>
    )
}

export default RegistrationPage;
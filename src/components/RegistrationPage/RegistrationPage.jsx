import React, {useState} from 'react';
import './RegistrationPage.css';

function RegistrationPage() {
    const [dialog, setDialog] = useState(0)

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
    
    fetch('https://localhost:7171/api/users/register', {
       method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSONBODY
    })
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return console.log(response);
      })
    .then(setDialog(1))

     console.log(JSONBODY)
    }

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
                        <option value="1">Analyst</option>
                        <option value="2">Temporary worker</option>
                        <option value="3">Client</option>
                        <option value="4">Administrator</option>
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
        </div>
    )
}

export default RegistrationPage;
import React from 'react';
import './ClientDashboard.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 


//Page for Indymo's clients to create a measurement request
//Should have input validation
function ClientDashboard() {
    const token = Cookies.get('Auth')
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
    e.preventDefault();
    const FORM_DATA = new FormData(e.currentTarget);
    const COMPANYNAME = FORM_DATA.get('companyname');
    const PLANDATE = FORM_DATA.get('plandate');
    const MEASUREMENTTPYE = FORM_DATA.get('measurementtype');
    const LOCATION = FORM_DATA.get('location')
    const PARAMETERS = FORM_DATA.get('parameters');
    const REMARKS = FORM_DATA.get('remarks');
    const VIDEOINCLUDED = FORM_DATA.get('videoincluded');
    const STARTDATE = FORM_DATA.get('startdate');
    const ENDDATE = FORM_DATA.get('enddate');
    const USERID = 0;
    const DEPTH = FORM_DATA.get('depth');
    const FIELDCONTACTFIRSTNAME = FORM_DATA.get('fieldcontactfirstname');
    const FIELDCONTACTLASTNAME = FORM_DATA.get('fieldcontactlastname');
    const FIELDCONTACTPHONENUMBER = FORM_DATA.get('fieldcontactphonenumber');
    //Convulted method for making a checkmark pass a boolean value
    if (VIDEOINCLUDED != null) {
        var VIDEOBOOL = true
    }
    else {
        var VIDEOBOOL = false
    }
    const ORDER = {COMPANYNAME, PLANDATE, MEASUREMENTTPYE, LOCATION, PARAMETERS, REMARKS, VIDEOBOOL, STARTDATE, ENDDATE, USERID, DEPTH, FIELDCONTACTFIRSTNAME, FIELDCONTACTLASTNAME, FIELDCONTACTPHONENUMBER}

    //As of now there is no proper method to read the user Id of the currently logged in user, so a default value is used
    //This value should be substituted as soon as possible
    const JSONBODY = JSON.stringify({ 
        "companyName": ORDER.COMPANYNAME,
        "planDate": ORDER.PLANDATE,
        "measurementType": ORDER.MEASUREMENTTPYE,
        "location": ORDER.LOCATION,
        "parameters": ORDER.PARAMETERS,
        "remarks": ORDER.REMARKS,
        "videoIncluded": ORDER.VIDEOBOOL,
        "startDate": ORDER.STARTDATE,
        "endDate": ORDER.ENDDATE,
        "userID": 0,
        "depth": ORDER.DEPTH,
        "fieldContactFirstName": ORDER.FIELDCONTACTFIRSTNAME,
        "fieldContactLastName": ORDER.FIELDCONTACTLASTNAME,
        "fieldContactPhoneNumber": ORDER.FIELDCONTACTPHONENUMBER,
    })
    fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
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
        .then(navigate('/orders'))
        .catch((error) => {
            console.log(error);
        })
    }

    return (
    <div className='clientpage'>
        <h1 className='registerheader'>
            Create Order
        </h1>
        <form onSubmit={handleSubmit}>
            <p className='orderparagraph' id='company'>
            <label htmlFor='companyname' className='orderlabel'>Company Name: </label>
                <input name='companyname' className='orderform' type='text'></input>
            </p>
            <p className='orderparagraph' id='plandate'>
            <label htmlFor='plandate' className='orderlabel'>Plan date: </label>
                <input name='plandate' className='orderform-datetime' type='datetime-local'></input>
            </p>
            <p className='orderparagraph' id='measure'>
            <label htmlFor='measurementtype' className='orderlabel'>Measurementtype: </label>
                <input name='measurementtype' className='orderform' type='text'></input>
            </p>
            <p className='orderparagraph' id='parameter'>
            <label htmlFor='parameters' className='orderlabel'>Parameters: </label>
                <input name='parameters' className='orderform' type='text'></input>
            </p>
            <p className='orderparagraph' id='location'>
            <label htmlFor='location' className='orderlabel'>Location: </label>
                <input name='location' className='orderform' type='text'></input>
            </p>
            <p className='orderparagraph' id='remark'>
            <label htmlFor='remarks' className='orderlabel'>Remarks: </label>
                <input name='remarks' className='orderform' type='text'></input>
            </p>
            <p className='orderparagraph' id='video'>
            <label htmlFor='videoincluded' className='ordercheck-label'>Include video:</label>
                <input name='videoincluded' className='ordercheck' type='checkbox'></input>
            </p>
            <p className='orderparagraph' id='start'>
            <label htmlFor='startdate' className='orderlabel'>Start date: </label>
                <input name='startdate' className='orderform-datetime' type='datetime-local'></input>
            </p>
            <p className='orderparagraph' id='end'>
            <label htmlFor='enddate' className='orderlabel'>End date: </label>
                <input name='enddate' className='orderform-datetime' type='datetime-local'></input>
            </p>
            <p className='orderparagraph' id='depth'>
                <label htmlFor='depth' className='orderlabel'>Depth: </label>
                <input name='depth' className='orderform' type='text'></input>
            </p>
            <p className='orderparagraph' id='contactfirst'>
            <label htmlFor='fieldcontactfirstname' className='orderlabel'>Fieldworker firstname: </label>
                <input name='fieldcontactfirstname' className='orderform' type='text'></input>
            </p>
            <p className='orderparagraph' id='contactlast'>
            <label htmlFor='fieldcontactlastname' className='orderlabel'>Fieldworker lastname: </label>
                <input name='fieldcontactlastname' className='orderform' type='text'></input>
            </p>
            <p className='orderparagraph' id='contactphone'>
            <label htmlFor='fieldcontactphonenumber' className='orderlabel'>Fieldworker phonenumber: </label>
                <input name='fieldcontactphonenumber' className='orderform' type='text'></input>
            </p>
            <button className='submitorder' type='submit'>Create order</button>
        </form>
    </div>
    )
}

export default ClientDashboard;
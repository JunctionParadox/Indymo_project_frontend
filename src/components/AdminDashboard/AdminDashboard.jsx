import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { NavLink } from 'react-router-dom';

//This component displays a list of users
function AdminDashboard() {
    const [table, setTable] = useState([]);

    const getUsers = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            }
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .then((data) => {
            const info = data
            setTable(info);
        })
        .catch((error) => {
        });
    };

    //The [] implies that the effect call has no dependencies
    //As such, it will only be called once on page-load
    useEffect(() => {
        getUsers();
    }, []);

    //the map function creates table rows for each
    return (

        <div className='AdminDashboard'>
            <h1>List of users</h1>
            <p>
                <button>
                    <NavLink to='/register'>Add user</NavLink>
                </button>
            </p>
            <table className='AdminTable'>
                <tr className='AdminHeaderRow'>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>User Role</th>
                </tr>
                {table.map((table) => (
                    <tr className='AdminDataRow' key={table.id}>
                        <td>{table.name}</td>
                        <td>{table.surname}</td>
                        <td>{table.email}</td>
                        <td>{table.role}</td>
                    </tr>
                ))}
            </table>
        </div>

    )

}

export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [table, setTable] = useState([]);
    const navigate = useNavigate();

    const getUsers = async () => {
    await fetch('https://localhost:7171/api/users', {
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
            //console.log(table)
        });
    };

    useEffect(() => {
        //Check if any user is obtained before stopping retrieval
        if(!table[0]) {
        getUsers();
        }
        else {
            console.log(table[0]);
        }
    }, [table]);

    useEffect(() =>{
        navigate('/register')
    })

    return (

        <div className='AdminDashboard'>
            <h1>List of users</h1>
            <p>
                <button onClick={useEffect()}>+</button> Add user
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
import React, { useEffect, useState} from 'react';
import './OrderOverview.css';
import Cookies from 'js-cookie';

//Page concerning measurement requests
//Error handeling should be improved upon to prevent state changes
//Also lacks user friendly error messaging

function OrderOverview() {
    const [orderTable, setOrderTable] = useState({});
    const [searchedOrder, setSearchedOrder] = useState({});
    const [newOrder, setNewOrder] = useState([]);
    const [workerList, setWorkerList] = useState({});
    const [orderId, setOrderId] = useState('');
    //Toggle changes the current state of the page
    // 0 = all, 1 = search result, 2 = unassigned, 3 = assigning temporary workers
    const [toggle, setToggle] = useState(2);
    const token = Cookies.get('Auth');

    //Retrieves all orders
    const getOrders = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
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
            setOrderTable(info);
            setToggle(0);
        })
        .catch((error) => {
                
        });
    };

    //Obtains a single order searched by Id
    const handleSubmit = async (e) => {
    e.preventDefault();
    const FORM_DATA = new FormData(e.currentTarget);
    const NUMBER = FORM_DATA.get('number');
    await fetch(`${process.env.REACT_APP_API_URL}/api/orders/` + NUMBER, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            }
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        }).then((data) => {
            const search = data
            setSearchedOrder(search)
            setToggle(1);
        })
        .catch((error) => {
                
        });
    };

    //Retrieves all orders with no assigned workers
    const getNewOrder = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/orders/newOrders`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                }
            })
            .then((response) => {
                if(!response.ok) {
                    throw new Error(response.status);
                } else {
                    return response.json();
                }
            }).then((data) => {
                const infoNew = data
                setNewOrder(infoNew)
                console.log(data)
                console.log(newOrder)
                setToggle(2);
            })
            .catch((error) => {
                
            });
        };

    //Retrieves list of all temporary workers
    const getTemporaryWorkers = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/orders/tempworkers`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                }
            })
            .then((response) => {
                if(!response.ok) {
                    throw new Error(response.status);
                } else {
                    return response.json();
                }
            }).then((data) => {
                const infoWorkers = data
                setWorkerList(infoWorkers)
                console.log(workerList)
            }).catch((error) => {
                
            });
        };

    const uploadWorker = async (e) => {
        e.preventDefault();
        const FORM_DATA = new FormData(e.currentTarget);
        const WORKERID = FORM_DATA.get('x');
        await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}/assign-tempworker/${WORKERID}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                }
            })
            .then((response) => {
                if(!response.ok) {
                    throw new Error(response.status);
                } else {
                    return response.json();
                }
            })
            .then(getOrders())
            .catch((error) => {
                
            });
        };

    const editWorker = (id) => {
        setOrderId(id);
        setToggle(3);
    }

    //The [] implies that the effect call has no dependencies
    //As such, it will only be called once on page-load
    useEffect(() => {
        getOrders()
        getTemporaryWorkers()
    }, []);

    return (
        <div className='OrderDashboard'>
            <h1>List of orders</h1>
            <p>
                <button onClick={getOrders}>All orders</button>
                <button onClick={getNewOrder}>New orders</button>
            </p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='number' className='number'>Search by id:</label>
                    <input name='number' type='text' />
                    <button type='submit'>Search</button>
                </form>
            {toggle === 0 && <table className='OrderTable'>
                <tr className='OrderHeaderRow'>
                    <th>Company name</th>
                    <th>PlanDate</th>
                    <th>Measurement type</th>
                    <th>Status</th>
                </tr>
                {orderTable.map((table) => (
                    <tr className='OrderDataRow' key={table.id}>
                        <td>{table.companyName}</td>
                        <td>{table.planDate}</td>
                        <td>{table.measurementType}</td>
                        <td>{table.status}</td>
                    </tr>
                ))}
            </table>
            }
            {toggle === 1 && <table className='OrderSearch'>
                <tr className='OrderHeaderRow'>
                    <th>Company name</th>
                    <th>PlanDate</th>
                    <th>Measurement type</th>
                    <th>Status</th>
                </tr>
                    <tr className='OrderDataRow'>
                        <td>{searchedOrder.companyName}</td>
                        <td>{searchedOrder.planDate}</td>
                        <td>{searchedOrder.measurementType}</td>
                        <td>{searchedOrder.status}</td>
                    </tr>
                </table>}
            {(toggle === 2) && <table className='NewOrders'>
                <tr className='OrderHeaderRow'>
                    <th>Company name</th>
                    <th>PlanDate</th>
                    <th>Measurement type</th>
                    <th>Status</th>
                    <th>Assign worker</th>
                </tr>
                {newOrder.map((neo) => (
                    <tr className='NewOrderRow' key={neo.id}>
                        <td>{neo.companyName}</td>
                        <td>{neo.planDate}</td>
                        <td>{neo.measurementType}</td>
                        <td>{neo.status}</td>
                        <button className='assign' onClick={() => editWorker(neo.id)}>Assign</button>
                    </tr>
                ))}
                </table>
                }
            {toggle === 3 && <form className='assignform' onSubmit={uploadWorker}>
                <p className='assignp'>Please select someone from the list to assign to the selected order:</p>
                    <select name='x' className='assignselect'>
                        {workerList.map((option) => (
                        <option key={option.id} value={option.id}>{option.fullName}</option>
                        ))}
                    </select>
                    <button className='submitworker' type='submit'>Assign worker</button>
                </form>
                }
        </div>
    )
}

export default OrderOverview;
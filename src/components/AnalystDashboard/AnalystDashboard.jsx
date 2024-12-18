import React, {useState, useEffect} from 'react';
import './AnalystDashboard.css'

//This component is a large place holder for what should be the page that display drone measurements
//Obviously lacks several details such electric conductivity and CO2-levels
function AnalystDashboard(){
    const [phase, setPhase] =  useState(3);
    const [collection, setCollection] = useState([]);
    const [id, setId] = useState(0);
    const [pressure, setPressure] = useState(0.0);
    const [depth, setDepth] = useState(0.000);
    const [ph, setPh] = useState(0.000);
    const [temp, setTemp] = useState(0.0);
    const [disOxygen, setDisOxygen] = useState(0.0);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [orderId, getOrderId] = useState(0)

    //Randomly generates data
    //Which is then stored in an array
    function FakeData() {
        setPressure(((Math.random() * (1035 - 1025 + 1)) + 1025).toFixed(1));
        setDepth(((Math.random() * (20 + 1))).toFixed(1));
        setPh(((Math.random() * (7 - 6 + 1)) + 6).toFixed(1));
        setTemp(((Math.random() * (24 - 16 + 1)) + 16).toFixed(1));
        setDisOxygen(((Math.random() * (92 - 90 + 1)) + 90).toFixed(7));
        setLat(((Math.random() * (52 - 51.75 + 1)) + 51.75).toFixed(5));
        setLong(((Math.random() * (4.4 - 4.2 + 1)) + 4.2).toFixed(5));
        UpdateCollection();
        setId(id + 1);
    }

    function UpdateCollection() {
        collection.push({
            id: id,
            pressure: pressure,
            depth: depth,
            ph: ph,
            temp: temp,
            disOxygen: disOxygen,
            lat: lat,
            long: long,
        })
        console.log(collection)
    }

    useEffect(() => {
        while(phase === 1) {
            const interval = setInterval(() => {
                FakeData();
            }, 5000);
            return () => clearInterval(interval);
        }
    })

    return (
        <div className='AnalystDashboard'>
            {phase===0 && <div className='measurementstart'>
            Selcted assignment:
            <p>
                Status: ready
            </p>
            <button onClick={() => setPhase(1)}>Start measurement</button>
            </div>
            }
            {phase===1 && <h1>Measuring status: Active</h1>}
            {(phase===2 || phase===3) && <h1>Measuring status: Inactive</h1>}
            {(phase===1 || phase===2 || phase ===3) && <div>
            <div className='datatype' id='pressure'>
                Pressure: <p className='number'>{pressure}</p>
            </div>
            <div className='datatype' id='temp'>
                Temperature: <p className='number'>{temp}</p>
            </div>
            <div className='datatype' id='depthtype'>
                Depth level: <p className='number'>{depth}</p>
            </div>
            <div className='datatype' id='oxygen'>
                Dissolved oxygen: <p className='number'>{disOxygen}</p>
            </div>
            <div className='datatype' id='lat'>
                Latitude: <p className='number'>{lat}</p>
            </div>
            <div className='datatype' id='long'>
                Longitude: <p className='number'>{long}</p>
            </div>
            {phase===1 && <button className='measurementbutton' onClick={() => setPhase(2)}>Stop</button>}
            {phase===3 && <button className='measurementbutton' onClick={() => setPhase(1)}>Start</button>}
            {phase===2 && <button className='measurementbutton' onClick={() => setPhase(1)}>Continue</button>}
            </div>}
            {(phase===1 || phase===2 || phase===3) && <div className='MeasurementCollection'>
                <table className='MeasurementTable'>
                    <thead>
                        <tr className='MeasurementRow'>
                            <th>Id</th>
                            <th>Pressure</th>
                            <th>Depth</th>
                            <th>Acidity</th>
                            <th>Dissolved oxygen</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                    {collection.map((collection) => (
                        <tr className='MeasurementDataRow' key={collection.id}>
                            <td>{collection.id}</td>
                            <td>{collection.pressure}</td>
                            <td>{collection.depth}</td>
                            <td>{collection.ph}</td>
                            <td>{collection.disOxygen}</td>
                            <td>{collection.lat}</td>
                            <td>{collection.long}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>}
        </div>
    )

}

export default AnalystDashboard;
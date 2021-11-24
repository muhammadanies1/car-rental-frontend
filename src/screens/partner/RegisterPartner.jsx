import { useState } from 'react';
import ReactMapGL, {  Popup } from 'react-map-gl';
import Swal from 'sweetalert2';

import "./RegisterPartner.css";
import { postJoinPartner } from '../../api/PartnerApi';
import { useNavigate } from 'react-router-dom';

function RegisterPartner() {
    const [newCoordinate, setNewCoordinate] = useState(null);
    let navigate = useNavigate();
    const [form, setForm] = useState({
        partner_name:"",
        city:"",
        latitude: "",
        longtitude: "",
    });

    const handleForm= (events) => {
        return setForm({
            ...form,
            [events.target.name]: events.target.value,
            latitude: newCoordinate.lat,
            longtitude: newCoordinate.long,
        });
    }

    const [viewport, setViewport] = useState({
        width: "75vw",
        height: "100vh",
        latitude: -6.261058,
        longitude: 106.642164,
        zoom: 10
    });

    const handleAddClick = (events) => {
        const [long, lat] = events.lngLat;
        setNewCoordinate({
            lat:lat,
            long:long,
        });
    }

    const handleSubmit= (events) => {
        events.preventDefault();
        postJoinPartner(form).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Your location has pined!',
                showConfirmButton: false,
                timer: 2000
            });
            navigate("/");
        })
        .catch((err) => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Your location not saved!',
                showConfirmButton: false,
                timer: 2000
            });
            navigate("/partner/register");
        })
    }


    return(
        <>
        <h4 className="title-joinPartner">Join Partner</h4>
        <hr className="garis-join"/>
        <div id="container-joinPartner">
            <div className="container-join-partner" gap={3}>
                <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken="pk.eyJ1IjoibXVoYW1tYWQtYW5pZXMxIiwiYSI6ImNrdzFsOXdqamEzdGgzMHFwdXVncWdtengifQ.kulWbTY0gS5iPELC-iOWGA"
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapStyle="mapbox://styles/muhammad-anies1/ckw4bf05v0ezn14nuofdmayiv"
                    onDblClick = { handleAddClick }
                    >
                
                    { newCoordinate && (
                        
                        <Popup latitude={newCoordinate.lat} 
                        longitude={newCoordinate.long} 
                        closeButton={true} 
                        closeOnClick={false} 
                        anchor="left" 
                        onClose={() => setNewCoordinate(null) }
                        >
                            <form className="form-maps" onSubmit={ handleSubmit }>
                                <div className="card-pop-up">
                                <label>Name Store</label>
                                <input className="input-maps-val" name="partner_name" type="text" 
                                    placeholder="Enter your partner name"
                                    onChange={ handleForm } />
                                <label>Address</label>
                                <input className="input-maps-val" name="city" type="text" 
                                    placeholder="Enter your city"
                                    onChange={ handleForm } />
                                <button className="submitButton" type="submit">Add Pin</button>
                        </div>
                            </form>
                        </Popup>
                    )}
                </ReactMapGL>
            </div>
        </div>
        </>
    )
}

export default RegisterPartner;
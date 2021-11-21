import { useState } from 'react';
import ReactMapGL, {  Popup } from 'react-map-gl';

import "./RegisterPartner.css";
import { postJoinPartner } from '../../api/PartnerApi';

function RegisterPartner() {
    const [newCoordinate, setNewCoordinate] = useState(null);
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
        width: "93vw",
        height: "100vh",
        latitude: -6.261058,
        longitude: 106.642164,
        zoom: 10
    });

    // useEffect(() => {
    //     const getPins = async () => {
    //         try {
    //             const res = await axios.get("/api/partners");
    //             setPins(res.data);
    //         } catch(err) {
    //             console.log(err);
    //         }
    //     };
    //     getPins();
    // }, []);

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
            alert("Join Berhasil!");
        })
        .catch((err) => {
            alert("Gagal Join!");
        })
    }


    return(
        <>
            <p className="name-partner">Join Partner</p>
            <div className="container-join-partner" gap={3}>
                <div className="bg-light border"> 
                <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken="pk.eyJ1IjoibXVoYW1tYWQtYW5pZXMxIiwiYSI6ImNrdzFsOXdqamEzdGgzMHFwdXVncWdtengifQ.kulWbTY0gS5iPELC-iOWGA"
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapStyle="mapbox://styles/muhammad-anies1/ckw4bf05v0ezn14nuofdmayiv"
                    onDblClick = { handleAddClick }
                    >
                    
                    {/* <Marker latitude={newCoordinate.lat} 
                        longitude={newCoordinate.long} 
                        offsetLeft={-20} 
                        offsetTop={-10}
                        closeButton={true} 
                        closeOnClick={false}
                        onClose={() => setNewCoordinate(null) } >
                        <RoomIcon style={{ fontSize:viewport.zoom * 5, color: "slateblue" }}/>
                    </Marker> */}
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
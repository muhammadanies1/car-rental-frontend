import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";

import "./RegisterPartner.css";

function RegisterPartner() {
    const [showPopup, togglePopup] = useState(false);
    const [joinPartner, setJoinPartner] = useState(null);
    const [newCoordinate, setNewCoordinate] = useState(null);

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
        setJoinPartner({
            lat:lat,
            long:long,
        });
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
                    
                    <Marker latitude={-6.261058} 
                        longitude={106.642164} 
                        offsetLeft={-20} 
                        offsetTop={-10}>
                        <RoomIcon style={{ fontSize:viewport.zoom * 5, color: "slateblue" }}/>
                    </Marker>
                    { joinPartner && (

                        <Popup latitude={joinPartner.lat} 
                        longitude={joinPartner.long} 
                        closeButton={true} 
                        closeOnClick={false} 
                        anchor="left" 
                        onClose={() => setJoinPartner(null) }
                        >
                        <div className="card-pop-up">
                            <label>Name Store</label>
                            <h4 className="store" >Jonathan RentCar</h4>
                            <label>Address</label>
                            <p className="desc">Bogor City</p>
                            <label>Owner</label>
                            <p className="desc">Jonathan Gabriel</p>
                            <label>Rating</label>
                            <div className="stars">
                                <StarIcon className="star"/>
                                <StarIcon className="star"/>
                                <StarIcon className="star"/>
                                <StarIcon className="star"/>
                                <StarIcon className="star"/>
                            </div>
                            <label>Information</label>
                            <span className="username">Created by <b>Jonathan</b> </span>
                            <span className="date"> 1 hour ago </span>
                        </div>
                        </Popup>
                    )}
                </ReactMapGL>
                </div>
            </div>
        </>
    )
}

export default RegisterPartner;
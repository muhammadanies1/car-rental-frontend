import { Card, Button, Col, Row } from "react-bootstrap";
import mapboxgl from 'mapbox-gl';
import { useRef, useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import FormRentCar from "../../components/modals/FormRentCar";
import RoomIcon from "@mui/icons-material/Room";

import gambar from './mcqueen.jpg';
import "./RentCar.css";
import axios from "axios";

const RentCar = () => {
    const [modalShow, setModalShow] = useState(false);
    const [partner, setPartner] = useState(null);

    const [viewport, setViewport] = useState({
        width: "57vw",
        height: "73vh",
        latitude: -6.261058,
        longitude: 106.642164,
        zoom: 10
    });
    

    return(
        <>
            <p className="name-partner">Jonathan RentCar</p>
            <Row>
                <Col sm={4}>
                <Card className="card-detail-car" style={{ width: '25rem' }}>
                    <Card.Img className="card-img" variant="top" src={gambar} />
                    <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title className="name-car" >Avanza New Gen</Card.Title>
                            <Card.Subtitle className="card-subtitle">Gading Serpong, Jonathan</Card.Subtitle>
                        </Col>
                        <Col md="auto">
                            <Card.Text className="price"> Rp 100.000 </Card.Text>
                            <Button className="btn-book" variant="primary" onClick={() => setModalShow(true)}>Book Now</Button></Col>
                    </Row>
                    <Row className="description">
                        <Col>Deskripsi</Col>
                    </Row>
                    </Card.Body>
                </Card>
                </Col>
                <Col sm={8}>
                    <Card className="card-maps">
                        <Card.Body>
                            <div>
                            <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken="pk.eyJ1IjoibXVoYW1tYWQtYW5pZXMxIiwiYSI6ImNrdzFsOXdqamEzdGgzMHFwdXVncWdtengifQ.kulWbTY0gS5iPELC-iOWGA"
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapStyle="mapbox://styles/muhammad-anies1/ckw4bf05v0ezn14nuofdmayiv"
                    >
                    
                    <Marker latitude={-6.261058} 
                        longitude={106.642164} 
                        offsetLeft={-20} 
                        offsetTop={-10}>
                        <RoomIcon style={{ fontSize:viewport.zoom * 5, color: "slateblue" }}/>
                    </Marker>
                    {/* { newCoordinate && (

                        <Popup latitude={newCoordinate.lat} 
                        longitude={newCoordinate.long} 
                        closeButton={true} 
                        closeOnClick={false} 
                        anchor="left" 
                        onClose={() => setNewCoordinate(null) }
                        >
                        <div className="card-pop-up">
                            <form onSubmit={handleSubmit}>
                                <label>Name Partner</label>
                                    <input name="partner_name" 
                                    placeholder="Enter your rent name"
                                    onChange={handleForm} />
                                <label>City</label>
                                    <input name="city" 
                                    placeholder="Enter your city"
                                    onChange={handleForm} />
                                <button className="submitButton" type="submit">Add Pin</button>
                            </form>
                        </div>
                        </Popup>
                    )} */}
                </ReactMapGL>
                            </div> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <FormRentCar show={modalShow} onHide={() => setModalShow(false)} />
        </>
        
    )
}

export default RentCar;
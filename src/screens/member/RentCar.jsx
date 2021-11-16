import { Card, Button, Col, Row } from "react-bootstrap";
import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';
import FormRentCar from "../../components/modals/FormRentCar";

import gambar from './mcqueen.jpg';
import "./RentCar.css";

const RentCar = () => {
    
    mapboxgl.accessToken = 'pk.eyJ1IjoibXVoYW1tYWQtYW5pZXMxIiwiYSI6ImNrdzFsOXdqamEzdGgzMHFwdXVncWdtengifQ.kulWbTY0gS5iPELC-iOWGA';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(106.642164);
    const [lat, setLat] = useState(-6.261058);
    const [zoom, setZoom] = useState(10);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
            });
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
                                <div ref={mapContainer} className="map-container" />
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
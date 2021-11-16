import { Stack, Form, Row, Col, Button } from "react-bootstrap";
import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';

import "./RegisterPartner.css";

function RegisterPartner() {

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
            <p className="name-partner">Register Partner</p>
            <Stack className="container-join-partner" gap={3}>
                <div className="bg-light border"> 
                    <div ref={mapContainer} className="map-container" />
                </div>
                <div className="bg-light border box2">
                <Form>
                    <Row className="row">
                        <Col>
                            <Form.Control placeholder="Name" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Lattitude" />
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col>
                            <Form.Control placeholder="Address" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Longtitude" />
                        </Col>
                    </Row>
                    <Button className="btn-submit" type="submit" >Submit</Button>
                </Form>
                </div>
            </Stack>
        </>
    )
}

export default RegisterPartner;
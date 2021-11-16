import { Button, Card, Row, Col, Modal } from "react-bootstrap";
import InputCar from "../../components/modals/InputCar";
import "./DashboardPartner.css";
import gambar from './mcqueen.jpg';
import React, { useRef, useEffect, useState } from 'react';

function DashboardPartner(){
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button className="btn-add" variant="primary" size="sm" onClick={() => setModalShow(true)}> + Add Car </Button>
            <Button className="balance" variant="primary" size="sm" disabled> Balance: Rp 10.000 </Button>
            <Card className="card" style={{ width: '25rem' }}>
                <Card.Img variant="top" src={gambar} />
                    <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title className="car-name">Avanza New Gen</Card.Title>
                            <Card.Subtitle className="card-subtitle">Gading Serpong, Jonathan</Card.Subtitle>
                        </Col>
                        <Col md="auto">
                            <Card.Text className="car-price"> Rp 100.000 </Card.Text>
                            <Button variant="primary" className="btn-status" disabled> Available </Button></Col>
                    </Row>
                    </Card.Body>
            </Card>
            <InputCar show={modalShow}
        onHide={() => setModalShow(false)} />
        </>
    )
}

export default DashboardPartner;
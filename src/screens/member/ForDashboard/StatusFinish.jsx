import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FormControl, Card, Button, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../DashboardMember.css";


function StatusFinish(props){

    console.log(props.cars);
    let navigate = useNavigate();

    function bookHandler(carId){
        navigate("/member/rentcar/"+carId);
    }

    return(
        <>
        <div id="container-dashboard">
            <h4>More than 100+ cars</h4>
            <hr className="more"/>
            <div id="container-car">
            {props.cars.map((value) => {
                return (
                    <Card className="card-car" style={{ width: '25rem' }}>
                        <Card.Img className="card-img" variant="top" src={value.image} />
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title className="car-name">{value.merk}</Card.Title>
                                    <Card.Subtitle className="card-subtitle">{value.partner.city}, {value.partner.partner_name}</Card.Subtitle>
                                </Col>
                                <Col md="auto">
                                    <Card.Text className="car-price"> Rp {value.price} </Card.Text>
                                    <Button className="btn-book" variant="primary" onClick={()=>bookHandler(value.car_id)}>Book Now</Button></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )
            })}
            </div>
        </div>
        </>
    )
}

export default StatusFinish;
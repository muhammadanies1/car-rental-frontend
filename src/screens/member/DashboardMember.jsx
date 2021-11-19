// import Header from "../../components/headers/Header";
import { Form, FormControl, Card, Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import gambar from './mcqueen.jpg';
import "./DashboardMember.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { carActions } from "../../store/car";
import { getData } from "../../api/AuthApi";

function DashboardMember(props) {
    const listCar = useSelector((state) => state.car);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);

    function bookHandler(events) {
        events.preventDefault();
        navigate("/member/rentcar/"+cars[0].car_id);
        window.location.reload();
        
    }


    useEffect(() => {
        axios.get(`/api/cars/status/true`)
            .then(res => {
                console.log(res);
                dispatch(carActions.getAllCarTrue(res.data))
                setCars(res.data.data)
            })
            
    }, [dispatch])
    // console.log(cars);
    return (
        <>
            <Form className="d-flex search-input">
                <FormControl type="search" placeholder="I need a car at" className="me-2" aria-label="Search" />
                <Button variant="outline-success"> Search </Button>
            </Form>
            <p className="title">More than 100+ cars</p>
            {cars.map((value) => {
                return (
                    <Card className="card-car" style={{ width: '25rem' }}>
                        <Card.Img className="card-img" variant="top" src= {value.image} />
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title className="car-name">{value.merk}</Card.Title>
                                    <Card.Subtitle className="card-subtitle">{value.partner.city}, {value.partner.partner_name}</Card.Subtitle>
                                </Col>
                                <Col md="auto">
                                    <Card.Text className="car-price"> Rp {value.price} </Card.Text>
                                    <Button className="btn-book" variant="primary" onClick={bookHandler}>Book Now</Button></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )
            })}

        </>

    )
}

export default DashboardMember;
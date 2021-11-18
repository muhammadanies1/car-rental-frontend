import { Button, Card, Row, Col } from "react-bootstrap";
import InputCar from "../../components/modals/InputCar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { partnerActions } from "../../store/partner";
import "./DashboardPartner.css";
import { useState } from "react";
import { useEffect } from "react";
import gambar from "./mcqueen.jpg";
import axios from "axios";
import { carActions } from "../../store/car";

function DashboardPartner(){

    const listCar = useSelector((state) => state.car);
    const thisPartner = useSelector((state) => state.partner);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);
    const [partner, setPartner] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const user_id = JSON.parse(localStorage.getItem("user_id"));

    useEffect(() => {
        axios.get(`/api/partner/user/${user_id}`)
            .then(res => {
                dispatch(partnerActions.getPartner(res.data.data))
                setPartner(res.data.data);
                // console.log(res.data.data.partner_id);
                axios.get(`/api/car/${res.data.data.partner_id}`)
                .then(res =>{
                    dispatch(carActions.getCarByPartner(res.data))
                    // console.log(res.data.data);
                    setCars(res.data.data)
                })
            })
            
    }, [dispatch])

    console.log(partner);
    return (
        <>
            <Button className="btn-add" variant="primary" size="sm" onClick={() => setModalShow(true)}> + Add Car </Button>
            <Button className="balance" variant="primary" size="sm" disabled> Balance: Rp {partner.user.balance} </Button>
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
                                    <Button variant="primary" className="btn-status" disabled> Available </Button></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )
            })}
            <InputCar show={modalShow} partner={partner} onHide={() => setModalShow(false)} />
        </>
    )
}

export default DashboardPartner;
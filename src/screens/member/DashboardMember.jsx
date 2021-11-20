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
import { useParams } from "react-router-dom";

function DashboardMember(props) {
    const listCar = useSelector((state) => state.car);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");
    const [carProcess, setCarProcess] = useState(null);
    let param = useParams();
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [userTransaction, setUserTransaction] = useState(0);

    function bookHandler(events) {
        events.preventDefault();
        navigate("/member/rentcar/"+cars[0].car_id);
        window.location.reload();
        
    }

    useEffect(() => {
        axios.get(`/api/cars/status/true`)
            .then(res => {
                // console.log(res);
                dispatch(carActions.getAllCarTrue(res.data))
                setCars(res.data.data)
            })

        axios.get(`/api/process/${user_id}`)
            .then(res => {
                console.log(res.data.data[0]);
                setCarProcess(res.data.data[0]);
                if(res.data.data[0] != null){
                    // console.log("masuk sini");
                    // setUserTransaction(res.data.data[0].user.user_id);
                }
                // dispatch(carActions.getAllCarTrue(res.data))
                // setCars(res.data.data)
            })
    }, [dispatch])

    function searchHandler(events) {
        setSearch(events.target.value);
    };

    function buttonSearchHandler(events) {
        axios.get(`/api/car/city/` + search)
            .then(res => {
                dispatch(carActions.getAllCarTrue(res.data.data))
                setCars(res.data.data)
            }, (error) => {
                alert("Tidak ada");
            })
    }

    function buttonReturnAndPaymentHandler(events) {
        console.log(carProcess.transaction_id);
        if(carProcess.paid_status == "Reserved"){
        axios.put("/api/transaction/return/" + carProcess.transaction_id)
            .then(res => {
                window.location.reload();
            })
        }else if(carProcess.paid_status == "Waiting for payment"){
            console.log(" sampun mlebet" + carProcess.transaction_id);
            axios.put("/api/transaction/paidoff/" + carProcess.transaction_id)
            .then(res => {
                window.snap.pay(res.data.message);
            })
        }
        
    }

    return (
        <>
            {userTransaction == user_id ?
                <Card className="card-car" style={{ width: '25rem' }}>
                <Card.Img className="card-img" variant="top" src={carProcess.car.image} />
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title className="car-name">{carProcess.car.merk}</Card.Title>
                            <Card.Subtitle className="card-subtitle">{carProcess.car.partner.city}, {carProcess.car.partner.partner_name}</Card.Subtitle>
                        </Col>
                        <Col md="auto">
                            <Card.Text className="car-price"> Rp {carProcess.total_payment + carProcess.penalty} </Card.Text>
                            <Button className="btn-book" variant="primary" onClick={buttonReturnAndPaymentHandler}>
                                {carProcess.paid_status == "Reserved" ? <>Return</> : 
                                carProcess.paid_status == "Return" ? <>Waiting payment</> :
                                carProcess.paid_status == "Waiting for payment" ? <>payment</> :
                                <>Paid off</>}</Button>
                            </Col>
                    </Row>
                </Card.Body>
            </Card>
                :
                <>
                    <Form className="d-flex search-input">
                        <FormControl type="search" placeholder="I need a car at" className="me-2" aria-label="Search" onChange={searchHandler} />
                        <Button variant="outline-success" onClick={buttonSearchHandler}> Search </Button>
                    </Form>
                    <p className="title">More than 100+ cars</p>
                    {cars.map((value) => {
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
                                            <Button className="btn-book" variant="primary" onClick={bookHandler}>Book Now</Button></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        )
                    })}

                </>
            }
        </>

    )
}

export default DashboardMember;
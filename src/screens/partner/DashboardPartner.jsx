import { Button, Card, Row, Col } from "react-bootstrap";
import InputCar from "../../components/modals/InputCar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { partnerActions } from "../../store/partner";
import "./DashboardPartner.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { carActions } from "../../store/car";

function DashboardPartner(props) {

    const listCar = useSelector((state) => state.car);
    const thisPartner = useSelector((state) => state.partner);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);
    const [partner, setPartner] = useState({});
    // const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [balance, setBalance] = useState(0);
    const user_id = JSON.parse(localStorage.getItem("user_id"));

    const setUlang = (payload) => {
        console.log(payload);
        setCars(payload)
    }

    const setUlangLagi = (payload) => {
        axios.get(`/api/car/${payload}`)
            .then(res => {
                dispatch(carActions.getCarByPartner(res.data))
                setUlang(res.data.data)
            })
    }

    function updateStatusLoanCar(val) {
        console.log(val);
        axios.post("/api/car/status/" + val.car_id).then((res) => {
            //   alert("berhasil update status");
            window.location.reload();
            setUlangLagi(val.partner.partner_name);
        });
    }

    useEffect(() => {
        // console.log("MASUK KESINI PARTNER DASHBOARD")
        // setIsLoading(true);
        axios.get(`/api/partner/user/${user_id}`)
            .then(res => {
                console.log(res.data.data)
                dispatch(partnerActions.getPartner(res.data.data))
                setPartner(res.data.data);
                setBalance(res.data.data.user.balance);
                axios.get(`/api/car/${res.data.data.partner_id}`)
                    .then(res => {
                        dispatch(carActions.getCarByPartner(res.data))
                        setCars(res.data.data)
                        // setIsLoading(false);
                    })
            })

    }, [dispatch])

    console.log(partner);
    return (
        <>
        <div id="container-dashboardPartner">
            <Button className="btn-add" variant="primary" size="sm" onClick={() => setModalShow(true)}> + Add Car </Button>
            <Button className="balance" variant="primary" size="sm" disabled> Balance: Rp {balance} </Button>
            <hr />
            <div id="flexbox-car">
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
                                        {
                                            value.status_loan == "available" ?
                                            <Button variant="success" id="btn-status" onClick={() => updateStatusLoanCar(value)}>
                                                    Available</Button>
                                                :
                                                <Button variant="danger" id="btn-status" onClick={() => updateStatusLoanCar(value)}>
                                                    Non-Available</Button>
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                )
            })}
            </div>
            <InputCar show={modalShow} partner={partner} setUlang={setUlang} onHide={() => setModalShow(false)} />
        </div>
        </>
    )
}

export default DashboardPartner;
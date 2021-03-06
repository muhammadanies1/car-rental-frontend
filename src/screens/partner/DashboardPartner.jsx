import "./DashboardPartner.css";
import { Button, Card, Row, Col } from "react-bootstrap";
import InputCar from "../../components/modals/InputCar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { partnerActions } from "../../store/partner";
import { useState } from "react";
import { useEffect } from "react";
import { carActions } from "../../store/car";
import axios from "axios";

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
    let token = localStorage.getItem("token");
 
    const setUlang = (payload) => {
        setCars(payload)
    }
    
    const setUlangLagi = (payload) => {
        axios.get(`/api/car/${payload}`,
        {headers: {Authorization : `Bearer ${token}`}}
        )
            .then(res => {
                dispatch(carActions.getCarByPartner(res.data))
                setUlang(res.data.data)
            })
    }

    function updateStatusLoanCar(val) {
        val.preventDefault();
        axios.post("/api/car/status/" + val.car_id ,
        {headers: {Authorization : `Bearer ${token}`}}).then((res) => {
            //   alert("berhasil update status");
            window.location.reload();
            setUlangLagi(val.partner.partner_name);
        });
    }

    useEffect(() => {
        axios.get(`/api/partner/user/${user_id}`,
        {headers: {Authorization : `Bearer ${token}`}})
            .then(res => {
                console.log(res.data.data)
                dispatch(partnerActions.getPartner(res.data.data))
                setPartner(res.data.data);
                setBalance(res.data.data.user.balance);
                axios.get(`/api/car/${res.data.data.partner_id}`,
                {headers: {Authorization : `Bearer ${token}`}}
                )
                    .then(res => {
                        dispatch(carActions.getCarByPartner(res.data))
                        setCars(res.data.data)
                    })
            })

    }, [dispatch])

    console.log(partner);
    return (
        <>
        <div className="container-top">
            <Button className="btn-add" variant="primary" size="sm" onClick={() => setModalShow(true)}> + Add Car </Button>
            <Button className="balance" variant="primary" size="sm" disabled> Balance: Rp {balance} </Button>
            <p className="p-myCar">My Car</p>
            <hr />
        </div>
        <div id="container-dashboardPartner">
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
                                            <Button disabled variant="success" id="btn-status" onClick={() => updateStatusLoanCar(value)}>
                                                    Available</Button>
                                                :
                                                <Button disabled variant="danger" id="btn-status" onClick={() => updateStatusLoanCar(value)}>
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
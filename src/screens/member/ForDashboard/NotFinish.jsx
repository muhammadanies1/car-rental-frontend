import { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import "./CustomDashboard.css";
import axios from "axios";


const NotFinish = () => {
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [carProcess, setCarProcess] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [car, setCar] = useState({});
    const [partner, setPartner] = useState({});
    let navigate = useNavigate();
    let token = localStorage.getItem("token");
    let headers = { 'Authorization': 'Bearer ' + token };
    const requestOptions = {
        headers: headers,
    };
    useEffect(() => {
        setIsLoading(true)
        axios.get(`/api/process/${user_id}`,requestOptions
        )
        .then(res => {
            // setTimeout(()=>{
                setCarProcess(res.data.data);
                setCar(res.data.data.car)
                setPartner(res.data.data.car.partner);
                setIsLoading(false);
            // },2000)
            
        })
    }, []);
    function buttonReturnAndPaymentHandler(events) {
        if(carProcess.paid_status == "Reserved"){
        axios.put("/api/transaction/return/" + carProcess.transaction_id)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: 'car return succes',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
                window.location.reload();
            })
        }else if(carProcess.paid_status == "Waiting for payment"){
            console.log(" sampun mlebet" + carProcess.transaction_id);
            axios.put("/api/transaction/paidoff/" + carProcess.transaction_id)
            .then(res => {
                console.log();
                window.snap.pay(res.data.data,{
                    onSuccess : function (result){
                        navigate({
                          pathname: "/member/dashboard",
                        });
                        window.location.reload();
                    },
                    onPending : function (result) {
                        navigate({
                            pathname: "/member/dashboard",
                          });
                        window.location.reload();
                    },
                    onError: function (result) {
                        navigate({
                            pathname: "/member/dashboard",
                          });
                          window.location.reload();
                      },
                    onClose: function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'You Have Unpaid Transaction!',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        navigate({
                            pathname: "/member/dashboard",
                          });
                          window.location.reload();
                    }    
                
                });
            })
        }
    }
    return(
    <>
        <p className="p-YourTR">Your Transaction</p>
        <hr className="garis-hr"/>
        <div id="card-with-status">
                {isLoading === true 
                ?
                <CircularProgress />
                :
                <Card className="card-car" style={{ width: '25rem' }}>
                <Card.Img className="card-img" variant="top" src={car.image} />
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title className="car-name">{car.merk}</Card.Title>
                            <Card.Subtitle className="card-subtitle">{partner.city}, {partner.partner_name}</Card.Subtitle>
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
                }
                
        </div>
    </>
    )

}

export default NotFinish
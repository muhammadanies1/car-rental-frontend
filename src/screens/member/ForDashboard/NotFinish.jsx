import { useState } from "react";
import { Form, FormControl, Card, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NotFinish = () => {
    const [carProcess, setCarProcess] = useState({});
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [isLoading, setIsLoading] = useState(false);
    const [car, setCar] = useState({});
    const [partner, setPartner] = useState({});
    let navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true)
        axios.get(`/api/process/${user_id}`)
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
                window.location.reload();
            })
        }else if(carProcess.paid_status == "Waiting for payment"){
            console.log(" sampun mlebet" + carProcess.transaction_id);
            axios.put("/api/transaction/paidoff/" + carProcess.transaction_id)
            .then(res => {
                window.snap.pay(res.data.data,{
                    onCapture : function (result){
                        navigate({
                          pathname: "/member/dashboard",
                        });
                        window.location.reload();
                    },
                    onPending : function (result) {
                        alert("pending");
                        navigate({
                            pathname: "/member/dashboard",
                          });
                        window.location.reload();
                    },
                    onError: function (result) {
                        alert("error")
                        navigate({
                            pathname: "/member/dashboard",
                          });
                          window.location.reload();
                      },
                    onClose: function () {
                        alert("Transaction Was Not Paid")
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

         <div id="card-with-status">
                <h4>Your Transaction</h4>
                <hr />
                {isLoading === true 
                ?
                <p>Lagi Loading</p>
                :
                // <p>Test</p>
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
    )

}

export default NotFinish
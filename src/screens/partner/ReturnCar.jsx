import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { partnerActions } from "../../store/partner";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { carActions } from "../../store/car";
import { Button, Card, Row, Col } from "react-bootstrap";
import { transactionActions } from "../../store/transaction";

function ReturnCar(props){

    const listTransactionByUser = useSelector((state) => state.transaction);
    const dispatch = useDispatch();
    const [transaction, setTransaction] = useState([]);
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get(`/api/member_transaction/${user_id}`)
            .then(res => {
                console.log(res.data.data)
                dispatch(transactionActions.getAllTransactionByUser(res.data.data))
                setTransaction(res.data.data);
            })
            
    }, [dispatch])

    console.log(transaction);

    function collectCars(){
        {transaction.map((value)=>{
            console.log(value);
        })}
    }
    
    return(
        <>
        {transaction.map((value)=>{
            let paid_status = value.paid_status;
            return (
                
                paid_status == "Finish" ? 
                <div>
                    <Card className="card-car" style={{ width: '25rem' }}>
                        <Card.Img className="card-img" variant="top" src= {value.car.image} />
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title className="car-name">{value.merk}</Card.Title>
                                    <Card.Subtitle className="card-subtitle">{value.car.partner.city}, {value.car.partner.partner_name}</Card.Subtitle>
                                </Col>
                                <Col md="auto">
                                    <Card.Text className="car-price"> Rp {value.car.price} </Card.Text>
                                    <Button variant="primary" className="btn-status" disabled> Available </Button></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
                : 
                ""
                )
        })}
            
        </>
    )
}

export default ReturnCar;
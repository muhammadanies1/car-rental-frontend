import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button, Card, Row, Col } from "react-bootstrap";
import { transactionActions } from "../../store/transaction";

function ReturnCar(props){

    const dispatch = useDispatch();
    const [transaction, setTransaction] = useState([]);
    const user_id = JSON.parse(localStorage.getItem("user_id"));

    useEffect(() => {
        axios.get(`/api/member_transaction/${user_id}`)
            .then(res => {
                console.log(res.data.data)
                dispatch(transactionActions.getAllTransactionByUser(res.data.data))
                setTransaction(res.data.data);
            })
            
    }, [dispatch])

    const setUlangLagi = () => {
        axios.get(`/api/member_transaction/${user_id}`)
            .then(res => {
                console.log(res.data.data)
                dispatch(transactionActions.getAllTransactionByUser(res.data.data))
                setTransaction(res.data.data);
            })
    }

    function updateStatusReturnCar(val) {
        console.log(val);
        axios.put("/api/car/waiting/" + val.transaction_id).then((res) => {
        //   alert("berhasil update status");
            window.location.reload();
            setUlangLagi();
        });
    }

    console.log(transaction);
    return(
        <>
        {transaction.map((value)=>{
            let paid_status = value.paid_status;
            return (      
                paid_status == "Return" ? 
                <div>
                    <Card className="card-car" style={{ width: '25rem' }}>
                        <Card.Img className="card-img" variant="top" src= {value.car.image} />
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title className="car-name">{value.car.merk}</Card.Title>
                                    <Card.Subtitle className="card-subtitle">{value.car.partner.city}, {value.car.partner.partner_name}</Card.Subtitle>
                                </Col>
                                <Col md="auto">
                                    <Card.Text className="car-price"> Rp {value.car.price} </Card.Text>
                                    <Button variant="primary" className="btn-status" onClick={() => updateStatusReturnCar(value)}> 
                                    {value.car.status_loan == "available" ? <>Available</> : <>Non-Available</>} </Button></Col>
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